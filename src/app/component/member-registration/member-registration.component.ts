import { Component, OnInit } from '@angular/core';

import { Society } from '../../classes/render/Society';
import { SocietyService } from '../../service/society.service';
import { Room } from '../../classes/render/Room';
import { RoomService } from '../../service/room.service';

import { MemberRegistrationForm } from '../../classes/io/MemberRegistrationForm';
import { MemberRegistrationService } from '../../service/member-registration.service';
import { AppError } from '../../classes/error/app-error';
import { HttpStatus } from '../../classes/common/HttpStatus';
import { Alert } from '../../classes/render/Alert';
import { AlertType } from '../../classes/enum/AlertType';
import { ValidationType } from '../../classes/enum/ValidationType';
import { Validation } from '../../classes/io/Validation';

@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.css']
})
export class MemberRegistrationComponent implements OnInit {

  private formSuccess: Alert = new Alert();
  private AlertType = AlertType;
  private ValidationType = ValidationType;

  private societies: Array<Society> = new Array<Society>();
  private rooms: Array<Room> = new Array<Room>();
  private memberRegistrationForm: MemberRegistrationForm = new MemberRegistrationForm();

  constructor(
    private societyService: SocietyService,
    private roomService: RoomService,
    private registrationService: MemberRegistrationService,
  ) { }

  ngOnInit() {
    this.memberRegistrationForm = {
      societyId: {
        validation: { flag: AlertType.DANGER, validationType: ValidationType.REQUIRED, message: 'Society is Mandatory.' },
        data: ''
      },
      roomId: {
        validation: { flag: AlertType.DANGER, validationType: ValidationType.REQUIRED, message: 'Room is Mandatory.'},
        data: ''
      },
      name: {
        validation: [
          { flag: AlertType.DANGER, validationType: ValidationType.REQUIRED, message: 'Name is Mandatory.'},
          { flag: AlertType.DANGER, validationType: ValidationType.VALID, message: 'Name must be Valid.'}
        ],
        data: ''
      },
      mobile: {
        validation: [
          { flag: AlertType.DANGER, validationType: ValidationType.REQUIRED, message: 'Mobile is Mandatory.'},
          { flag: AlertType.DANGER, validationType: ValidationType.VALID, message: 'Mobile must be Valid.'}
        ],
        data: ''
      },
      password: {
        validation: { flag: AlertType.DANGER, validationType: ValidationType.REQUIRED, message: 'Password is Mandatory.'},
        data: ''
      },
      confirmPassword: {
        validation: [
          { flag: AlertType.DANGER, validationType: ValidationType.REQUIRED, message: 'Confirm Password is Mandatory.'},
          { flag: AlertType.DANGER, validationType: ValidationType.MATCH, message: 'Confirm Password must match Password.'}
        ],
        data: ''
      }
    };

    this.getSociety();
  }

  getSociety(): void {
    this.memberRegistrationForm.societyId.validation.flag = AlertType.INFO;
    this.memberRegistrationForm.societyId.validation.message = 'Fetching Data. Please wait.';

    this.societyService.getAllSocieties()
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            this.societies = response.data.societies
            this.memberRegistrationForm.societyId.validation.flag = AlertType.DANGER;
            this.memberRegistrationForm.societyId.validation.message = 'Society is mandatory.';
            return false;
          }

          this.memberRegistrationForm.societyId.validation.flag = AlertType.DANGER;
          this.memberRegistrationForm.societyId.validation.message = 'Something went wrong.';
        },
        (error: AppError) => {
          this.memberRegistrationForm.societyId.validation.flag = AlertType.DANGER;
          this.memberRegistrationForm.societyId.validation.message = 'Something went wrong.';
        }
      );
  }

  getRooms() {
    if (this.memberRegistrationForm.societyId.data == '') {
      this.rooms = null;
      return false;
    }

    this.memberRegistrationForm.roomId.validation.flag = AlertType.INFO;
    this.memberRegistrationForm.roomId.validation.message = 'Fetching Data. Please wait.';

    this.roomService.getRoomsBySocietyId(this.memberRegistrationForm.societyId.data)
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            this.rooms = response.data.rooms;
            this.memberRegistrationForm.roomId.validation.flag = AlertType.DANGER;
            this.memberRegistrationForm.roomId.validation.message = 'Room is Mandatory';
            return false;
          }

          this.memberRegistrationForm.roomId.validation.flag = AlertType.DANGER;
          this.memberRegistrationForm.roomId.validation.message = 'Something went wrong.';
        },
        (error: AppError) => {
          this.memberRegistrationForm.roomId.validation.flag = AlertType.DANGER;
          this.memberRegistrationForm.roomId.validation.message = 'Something went wrong.';
        }
      );
  }

  register(formRegistration) {
    this.formSuccess.type = AlertType.INFO;
    this.formSuccess.text = 'Saving Data. Please wait.';

    this.registrationService.registration(this.memberRegistrationForm)
      .subscribe(
        response => {
          if (response.code === HttpStatus.CREATED || response.code === HttpStatus.CONFLICT) {
            this.formSuccess.type = AlertType.SUCCESS;
            //this.formSuccess.text = response.validation.message;
            formRegistration.reset();
            return false;
          }

          if (response.code === HttpStatus.BAD_REQUEST) {
            Object.keys(response.data.validationError).forEach(element => {
              this.memberRegistrationForm[element].validation = new Array<Validation>();

              if (!response.data.validationError[element].length) {
                this.memberRegistrationForm[element].validation = response.data.validationError[element];
              } else {
                response.data.validationError[element].forEach(elementArray => {
                  this.memberRegistrationForm[element].validation.push(elementArray);
                });
              }
            });

            this.formSuccess.type = AlertType.DANGER;
            //this.formSuccess.text = response.validation.message;
            return false;
          }

          this.formSuccess.type = AlertType.DANGER;
          this.formSuccess.text = 'Something went wrong.';
        },
        (error: Response) => {
          this.formSuccess.type = AlertType.DANGER
          this.formSuccess.text = 'Something went wrong.';
        }
      );
  }
}