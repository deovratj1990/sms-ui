import { Component, OnInit } from '@angular/core';
import { Alert } from '../../classes/render/Alert';
import { AlertType } from '../../classes/enum/AlertType';
import { SocietyRegistrationForm } from '../../classes/io/SocietyRegistrationForm';

@Component({
  selector: 'app-society-registration',
  templateUrl: './society-registration.component.html',
  styleUrls: ['./society-registration.component.css']
})
export class SocietyRegistrationComponent implements OnInit {

  private formAlert: Alert = new Alert();
  private AlertType = AlertType;

  private societyRegistrationForm: SocietyRegistrationForm = new SocietyRegistrationForm();

  constructor() { }

  ngOnInit() { }

  getWingDom(): void {
    this.societyRegistrationForm.wings = null;
    this.societyRegistrationForm.wings = [{name: '', room: ''}];

    for(let i = 1;i < this.societyRegistrationForm.wingCount;i++) {
      this.societyRegistrationForm.wings.push({name: '', room: ''});
    }
  }

  register(formSocietyRegistration): void {
    console.log(formSocietyRegistration.value);
  }

}
