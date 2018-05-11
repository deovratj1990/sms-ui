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
import { ElementAlert } from '../../classes/common/memberRegistrationAlerts';
import { MemberRegistrationAlert } from '../../classes/formAlert/MemberRegistrationAlert';

@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.css']
})
export class MemberRegistrationComponent implements OnInit {

  private formAlert: Alert = new Alert();
  private AlertType = AlertType;
  private ValidationType = ValidationType;

  private societies: Array<Society> = new Array<Society>();
  private rooms: Array<Room> = new Array<Room>();
  private memberRegistrationForm: MemberRegistrationForm = new MemberRegistrationForm();
  private memberRegistrationAlerts: MemberRegistrationAlert = new MemberRegistrationAlert();

  constructor(
    private societyService: SocietyService,
    private roomService: RoomService,
    private registrationService: MemberRegistrationService,
  ) { }

  ngOnInit() {
    this.memberRegistrationAlerts = {
      societyId: {
        activityType: { show: 1, type: AlertType.INFO, text: 'Fetching Data. Please wait.' },
        validation: [{ validationType: ValidationType.REQUIRED, text: 'Society is Mandatory.' }]
      },
      roomId: {
        activityType: { show: 0, type: AlertType.INFO, text: 'Fetching Data. Please wait.' },
        validation: [{ validationType: ValidationType.REQUIRED, text: 'Room is Mandatory.' }],
      },
      name: {
        activityType: { show: 0, type: null, text: null },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Name is Mandatory.' },
          { validationType: ValidationType.VALID, text: 'Name must be Valid.' }
        ],
      },
      mobile: {
        activityType: { show: 0, type: null, text: null },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Mobile is Mandatory.' },
          { validationType: ValidationType.VALID, text: 'Mobile must be Valid.' }
        ],
      },
      password: {
        activityType: { show: 0, type: null, text: null },
        validation: [{ validationType: ValidationType.REQUIRED, text: 'Password is Mandatory.' }],
      },
      confirmPassword: {
        activityType: { show: 0, type: null, text: null },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Confirm Password is Mandatory.' },
          { validationType: ValidationType.MATCH, text: 'Confirm Password must match Password.' }
        ],
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
            this.memberRegistrationAlerts.societyId.activityType.show = 0;
            return false;
          }

          this.memberRegistrationAlerts.societyId.activityType.show = 1;
          this.memberRegistrationAlerts.societyId.activityType.type = AlertType.DANGER
          this.memberRegistrationAlerts.societyId.activityType.text = 'Something went wrong.';
        },
        (error: AppError) => {
          this.memberRegistrationAlerts.societyId.activityType.show = 1;
          this.memberRegistrationAlerts.societyId.activityType.type = AlertType.DANGER
          this.memberRegistrationAlerts.societyId.activityType.text = 'Something went wrong.';
        }
      );
  }

  getRooms() {
    this.memberRegistrationForm.roomId = '';
    this.rooms = new Array<Room>();

    if (this.memberRegistrationForm.societyId == '') {
      this.rooms = null;
      return false;
    }

    this.memberRegistrationAlerts.roomId.activityType.show = 1;

    this.roomService.getRoomsBySocietyId(this.memberRegistrationForm.societyId)
      .subscribe(
        response => {
          if (response.code === HttpStatus.OK || response.code === HttpStatus.NO_CONTENT) {
            this.rooms = response.data.rooms;
            this.memberRegistrationAlerts.roomId.activityType.show = 0;
            return false;
          }

          this.memberRegistrationAlerts.roomId.activityType.show = 1;
          this.memberRegistrationAlerts.roomId.activityType.type = AlertType.DANGER
          this.memberRegistrationAlerts.roomId.activityType.text = 'Something went wrong.';
        },
        (error: AppError) => {
          this.memberRegistrationAlerts.roomId.activityType.show = 1;
          this.memberRegistrationAlerts.roomId.activityType.type = AlertType.DANGER
          this.memberRegistrationAlerts.roomId.activityType.text = 'Something went wrong.';
        }
      );
  }

  register(formRegistration) {
    this.formAlert.type = AlertType.INFO;
    this.formAlert.text = 'Saving Data. Please wait.';

    this.registrationService.registration(this.memberRegistrationForm)
      .subscribe(
        response => {
          if (response.code === HttpStatus.CREATED || response.code === HttpStatus.CONFLICT) {
            this.formAlert.type = AlertType.SUCCESS;
            this.formAlert.text = response.message;
            formRegistration.reset();
            return false;
          }

          if (response.code === HttpStatus.BAD_REQUEST) {

            Object.keys(response.data.validationError).forEach(element => {

              if (response.data.validationError[element].length) {

                response.data.validationError[element].forEach(resElement => {

                  if (this.memberRegistrationAlerts[element].validation.length) {
                    let index = this.memberRegistrationAlerts[element].validation.findIndex(x => x.validationType == resElement.validationType);
                    this.memberRegistrationAlerts[element].validation[index].text = resElement.text;
                  } else {
                    if (this.memberRegistrationAlerts[element].validation.validationType == resElement.validationType)
                      this.memberRegistrationAlerts[element].validation.text = resElement.text;
                  }

                });

              } else {

                if (this.memberRegistrationAlerts[element].validation.length) {
                  let index = this.memberRegistrationAlerts[element].validation.findIndex(x => x.validationType == response.data.validationError[element].validationType);
                  this.memberRegistrationAlerts[element].validation[index].text = response.data.validationError[element].text;
                } else
                  this.memberRegistrationAlerts[element].validation.text = response.data.validationError[element].text;

              }
            });

            this.formAlert.type = AlertType.DANGER;
            this.formAlert.text = response.message;
            return false;
          }

          this.formAlert.type = AlertType.DANGER;
          this.formAlert.text = 'Something went wrong.';
        },
        (error: Response) => {
          this.formAlert.type = AlertType.DANGER
          this.formAlert.text = 'Something went wrong.';
        }
      );
  }
}