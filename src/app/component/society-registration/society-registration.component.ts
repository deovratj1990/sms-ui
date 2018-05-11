import { Component, OnInit } from '@angular/core';
import { Alert } from '../../classes/render/Alert';
import { AlertType } from '../../classes/enum/AlertType';
import { SocietyRegistrationForm } from '../../classes/io/SocietyRegistrationForm';
import { ValidationType } from '../../classes/enum/ValidationType';
import { SocietyRegistrationAlert } from '../../classes/formAlert/SocietyRegistrationAlert';

@Component({
  selector: 'app-society-registration',
  templateUrl: './society-registration.component.html',
  styleUrls: ['./society-registration.component.css']
})
export class SocietyRegistrationComponent implements OnInit {

  private formAlert: Alert = new Alert();
  private AlertType = AlertType;

  private societyRegistrationForm: SocietyRegistrationForm = new SocietyRegistrationForm();
  private societyRegistrationAlerts: SocietyRegistrationAlert = new SocietyRegistrationAlert();
  private secretaryWing: Array<{id: number, name: string}> = new Array<{id: number, name: string}>()

  constructor() { }

  ngOnInit() {

    this.societyRegistrationAlerts = {
      name: {
        activityType: { show: 0, type: null, text: null },
        validation: [{ validationType: ValidationType.REQUIRED, text: 'Name is Mandatory.' }],
      },
      wingCount: {
        activityType: { show: 0, type: null, text: null },
        validation: [{ validationType: ValidationType.REQUIRED, text: 'Wings is Mandatory.' }],
      },
      wings: {
        name: {
          activityType: { show: 0, type: null, text: null },
          validation: [{ validationType: ValidationType.REQUIRED, text: 'Wing is Mandatory.' }],
        },
        room: {
          activityType: { show: 0, type: null, text: null },
          validation: [{ validationType: ValidationType.REQUIRED, text: 'Room is Mandatory.' }],
        }
      },
      secretary: {
        wing: {
          activityType: { show: 0, type: null, text: null },
          validation: [{ validationType: ValidationType.REQUIRED, text: 'Secretary Wing is Mandatory.' }],
        },
        room: {
          activityType: { show: 0, type: null, text: null },
          validation: [{ validationType: ValidationType.REQUIRED, text: 'Secretary Room is Mandatory.' }],
        },
        mobile: {
          activityType: { show: 0, type: null, text: null },
          validation: [{ validationType: ValidationType.REQUIRED, text: 'Secretary Mobile is Mandatory.' }],
        }
      }
    };

  }

  getWingDom(): void {
    this.societyRegistrationForm.wings = null;
    this.societyRegistrationForm.wings = [{name: '', room: ''}];

    for (let i = 1; i < Number(this.societyRegistrationForm.wingCount); i++) {
      this.societyRegistrationForm.wings.push({name: '', room: ''});
    }
  }

  determineSecWing(): void {
    console.log(this.societyRegistrationForm.wings)
  }

  register(formSocietyRegistration): void {
    console.log(this.societyRegistrationForm);
  }

}
