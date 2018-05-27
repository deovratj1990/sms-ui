import { Component, OnInit } from '@angular/core';
import { Alert } from '../../../model/common/Alert';
import { AlertType } from '../../../model/enum/AlertType';
import { ValidationType } from '../../../model/enum/ValidationType';
import { Society } from '../../../model/society/society/Society';
import { Room } from '../../../model/society/room/Room';
import { MemberRegistration } from '../../../model/user/member-registration/MemberRegistration';
import { MemberRegistrationAlert } from '../../../model/user/member-registration/MemberRegistrationAlert';
import { SocietyService } from '../../../service/society/society/Society.service';
import { RoomService } from '../../../service/society/room/Room.service';
import { MemberRegistrationService } from '../../../service/user/member-registration/MemberRegistration.service';
import { HttpStatus } from '../../../model/common/HttpStatus';
import { AppError } from '../../../model/error/app-error';


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
  private memberRegistrationForm: MemberRegistration = new MemberRegistration();
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
