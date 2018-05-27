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

  private rooms: Array<any> = new Array<any>();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {

    this.loginForm.operation = 'ROOM';

    if (this.loginService.isLoggedIn()) {
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
      accessId: {
        activityType: { show: 0, type: null, text: null },
        validation: [{ validationType: ValidationType.REQUIRED, text: 'Room is Required.' }]
      },
      password: {
        activityType: { show: 0, type: null, text: null },
        validation: [{ validationType: ValidationType.REQUIRED, text: 'Password is Required.' }]
      },
    };
  }

  ngOnInit() { }

  detectChanges(element): void {
    switch (element) {
      case 'mobile':
        this.rooms = new Array<Room>();
      break;
    }
  }

  login(formLogin) {

    this.formAlert.type = AlertType.INFO;
    this.formAlert.text = 'Loging In. Please wait.';

    this.loginService.login(this.loginForm)
      .subscribe(
        response => {
          switch (response.code) {
            case HttpStatus.UNAUTHORIZED:
            case HttpStatus.FORBIDDEN:
              this.formAlert.type = AlertType.DANGER;
              this.formAlert.text = response.message;
            break;

            case HttpStatus.BAD_REQUEST:
              this.formAlert.type = AlertType.DANGER;
              this.formAlert.text = response.message;
              break;

            case HttpStatus.OK:

              if(response.data.rooms) {

                if (response.data.rooms.length > 0) {

                  this.loginForm.operation = 'PASSWORD';  
                  this.rooms = response.data.rooms;
                  this.formAlert.type = AlertType.SUCCESS;
                  this.formAlert.text = '';
  
                } else {

                  this.loginForm.operation = 'ROOM';  
                  this.formAlert.type = AlertType.DANGER;
                  this.formAlert.text = 'Something went wrong.';
  
                } 

              } else {

                if(response.data.token) {

                  localStorage.setItem('token', response.data.token);
                  this.router.navigate(['/dashboard']);
                  return false;
      
                }

              }

            break;

            default:

              this.loginForm.operation = 'ROOM';  
              this.formAlert.type = AlertType.DANGER;
              this.formAlert.text = 'Something went wrong.';
          }
        },
        (error: AppError) => {
          this.formAlert.type = AlertType.DANGER;
          this.formAlert.text = 'Something went wrong.';
        }
      );
  }
}
