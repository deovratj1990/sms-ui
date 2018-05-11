import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { Alert } from '../../classes/render/Alert';
import { AlertType } from '../../classes/enum/AlertType';
import { LoginForm } from '../../classes/io/LoginForm';
import { HttpStatus } from '../../classes/common/HttpStatus';
import { Room } from '../../classes/render/Room';
import { AppError } from '../../classes/error/app-error';
import { ValidationType } from '../../classes/enum/ValidationType';
import { LoginAlert } from '../../classes/formAlert/LoginAlert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private formAlert: Alert = new Alert();
  private AlertType = AlertType;

  private loginForm: LoginForm = new LoginForm();
  private loginAlerts: LoginAlert = new LoginAlert();
  private rooms: Array<Room> = new Array<Room>();
  private requireOtp: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginAlerts = {
      mobile: {
        activityType: { show: 0, type: null, text: null },
        validation: [
          { validationType: ValidationType.REQUIRED, text: 'Mobile is Required.' },
          { validationType: ValidationType.VALID, text: 'Mobile must be Valid.' }
        ]
      },
      password: {
        activityType: { show: 0, type: null, text: null },
        validation: [{ validationType: ValidationType.REQUIRED, text: 'Password is Required.' }]
      },
      roomId: {
        activityType: { show: 0, type: null, text: null },
        validation: [{ validationType: ValidationType.REQUIRED, text: 'Room is Required.' }]
      },
      otp: {
        activityType: { show: 0, type: null, text: null },
        validation: [{ validationType: ValidationType.REQUIRED, text: 'OTP is Required.' }]
      }
    };
  }

  ngOnInit() { }

  detectChanges(element): void {
    switch (element) {
      case 'mobile':
        this.rooms = new Array<Room>();
        this.requireOtp = false;
        break;
      case 'roomId':
        this.requireOtp = false;
        break;
    }
  }

  login(formLogin) {

    this.formAlert.type = AlertType.INFO;
    this.formAlert.text = 'Saving Data. Please wait.';

    this.loginService.login(this.loginForm)
      .subscribe(
        response => {
          switch (response.code) {
            case HttpStatus.FORBIDDEN:
              this.formAlert.type = AlertType.DANGER;
              this.formAlert.text = response.message;
              this.rooms = new Array<Room>();
              this.requireOtp = false;

            case HttpStatus.BAD_REQUEST:

              this.formAlert.type = AlertType.DANGER;
              this.formAlert.text = response.message;

              if (response.data.validationError) {

                Object.keys(response.data.validationError).forEach(element => {

                  if (response.data.validationError[element].length) {

                    response.data.validationError[element].forEach(resElement => {

                      if (this.loginAlerts[element].validation.length) {
                        let index = this.loginAlerts[element].validation.findIndex(x => x.validationType == resElement.validationType);
                        this.loginAlerts[element].validation[index].text = resElement.text;
                      } else {
                        if (this.loginAlerts[element].validation.validationType == resElement.validationType)
                          this.loginAlerts[element].validation.text = resElement.text;
                      }

                    });

                  } else {

                    if (this.loginAlerts[element].validation.length) {
                      let index = this.loginAlerts[element].validation.findIndex(x => x.validationType == response.data.validationError[element].validationType);
                      this.loginAlerts[element].validation[index].text = response.data.validationError[element].text;
                    } else
                      this.loginAlerts[element].validation.text = response.data.validationError[element].text;

                  }
                });

              }


            case HttpStatus.OK:
              if ('multipleRooms' in response.data) {
                this.rooms = response.data.multipleRooms;
                this.requireOtp = false;
                this.formAlert.type = AlertType.SUCCESS;
                this.formAlert.text = response.message;
                return false;
              }

              if ('requireOtp' in response.data && response.data.requireOtp) {
                this.requireOtp = true;
                this.formAlert.type = AlertType.SUCCESS;
                this.formAlert.text = response.message;
              }

              if ('token' in response.data) {
                this.formAlert.type = AlertType.SUCCESS;
                this.formAlert.text = response.message;
                localStorage.setItem('token', response.data.token);
                this.router.navigate(['/dashboard']);
              }
          }
        },
        (error: AppError) => {
          this.formAlert.type = AlertType.DANGER;
          this.formAlert.text = 'Something went wrong.';
        }
      );
  }
}
