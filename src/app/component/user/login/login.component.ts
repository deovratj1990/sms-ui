import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '../../../model/common/Alert';
import { AlertType } from '../../../model/enum/AlertType';
import { Login } from '../../../model/user/login/Login';
import { LoginAlert } from '../../../model/user/login/LoginAlert';
import { Room } from '../../../model/society/room/Room';
import { LoginService } from '../../../service/user/login/Login.service';
import { ValidationType } from '../../../model/enum/ValidationType';
import { HttpStatus } from '../../../model/common/HttpStatus';
import { AppError } from '../../../model/error/app-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private formAlert: Alert = new Alert();
  private AlertType = AlertType;

  private loginForm: Login = new Login();
  private loginAlerts: LoginAlert = new LoginAlert();
  private rooms: Array<Room> = new Array<Room>();

  private requireOtp: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {

    if(this.loginService.isLoggedIn()) {
      router.navigate(['/dashboard']);
    };


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
              break;

            case HttpStatus.BAD_REQUEST:
              this.formAlert.type = AlertType.DANGER;
              this.formAlert.text = response.message;
              break;


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
              break;
          }
        },
        (error: AppError) => {
          this.formAlert.type = AlertType.DANGER;
          this.formAlert.text = 'Something went wrong.';
        }
      );
  }
}
