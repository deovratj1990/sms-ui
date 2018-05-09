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
        activityType: {show: 1, type: AlertType.INFO, text: 'Fetching Data. Please wait.'},
        validation: { validationType: ValidationType.REQUIRED, text: 'Society is Mandatory.' },
        data: ''
      },
      roomId: {
        activityType: {show: 0, type: AlertType.INFO, text: 'Fetching Data. Please wait.'},
        validation: { validationType: ValidationType.REQUIRED, text: 'Room is Mandatory.' },
        data: ''
      },
      name: {
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Name is Mandatory.' },
          { validationType: ValidationType.VALID, text: 'Name must be Valid.' }
        ],
        data: ''
      },
      mobile: {
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Mobile is Mandatory.' },
          { validationType: ValidationType.VALID, text: 'Mobile must be Valid.' }
        ],
        data: ''
      },
      password: {
        validation: { validationType: ValidationType.REQUIRED, text: 'Password is Mandatory.' },
        data: ''
      },
      confirmPassword: {
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Confirm Password is Mandatory.' },
          { validationType: ValidationType.MATCH, text: 'Confirm Password must match Password.' }
        ],
        data: ''
      }
    };

    this.getSociety();
  }

  getSociety(): void {

    this.societyService.getAllSocieties()
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            this.societies = response.data.societies
            this.memberRegistrationForm.societyId.activityType.show = 0;
            return false;
          }

          this.memberRegistrationForm.societyId.activityType.show = 1;
          this.memberRegistrationForm.societyId.activityType.type = AlertType.DANGER
          this.memberRegistrationForm.societyId.activityType.text = 'Something went wrong.';
        },
        (error: AppError) => {
          this.memberRegistrationForm.societyId.activityType.show = 1;
          this.memberRegistrationForm.societyId.activityType.type = AlertType.DANGER
          this.memberRegistrationForm.societyId.activityType.text = 'Something went wrong.';
        }
      );
  }

  getRooms() {
    if (this.memberRegistrationForm.societyId.data == '') {
      this.rooms = null;
      return false;
    }

    this.memberRegistrationForm.roomId.activityType.show = 1;

    this.roomService.getRoomsBySocietyId(this.memberRegistrationForm.societyId.data)
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            this.rooms = response.data.rooms;
            this.memberRegistrationForm.roomId.validation.text = 'Room is Mandatory';
            this.memberRegistrationForm.roomId.activityType.show = 0;
            return false;
          }

          this.memberRegistrationForm.roomId.activityType.show = 1;
          this.memberRegistrationForm.roomId.activityType.type = AlertType.DANGER
          this.memberRegistrationForm.roomId.validation.text = 'Something went wrong.';
        },
        (error: AppError) => {
          this.memberRegistrationForm.roomId.activityType.show = 1;
          this.memberRegistrationForm.roomId.activityType.type = AlertType.DANGER
          this.memberRegistrationForm.roomId.validation.text = 'Something went wrong.';
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
            //this.formSuccess.text = response.validation.text;
            formRegistration.reset();
            return false;
          }

          if (response.code === HttpStatus.BAD_REQUEST) {

            Object.keys(response.data.validationError).forEach(element => {

              if (response.data.validationError[element].length) {

                response.data.validationError[element].forEach(resElement => {

                  if (this.memberRegistrationForm[element].validation.length) {
                    let index = this.memberRegistrationForm[element].validation.findIndex(x => x.validationType == resElement.validationType);
                    this.memberRegistrationForm[element].validation[index].text = resElement.text;
                  } else {
                    if (this.memberRegistrationForm[element].validation.validationType == resElement.validationType)
                      this.memberRegistrationForm[element].validation.text = resElement.text;
                  }

                });

              } else {

                if (this.memberRegistrationForm[element].validation.length) {
                  let index = this.memberRegistrationForm[element].validation.findIndex(x => x.validationType == response.data.validationError[element].validationType);
                  this.memberRegistrationForm[element].validation[index].text = response.data.validationError[element].text;
                } else
                  this.memberRegistrationForm[element].validation.text = response.data.validationError[element].text;

              }
            });

            this.formSuccess.type = AlertType.DANGER;
            this.formSuccess.text = response.message;
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