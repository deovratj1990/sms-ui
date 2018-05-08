import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { Alert } from '../../classes/render/Alert';
import { AlertType } from '../../classes/enum/AlertType';
import { LoginForm } from '../../classes/io/LoginForm';
import { HttpStatus } from '../../classes/common/HttpStatus';
import { Room } from '../../classes/render/Room';
import { AppError } from '../../classes/error/app-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private formAlert: Alert = new Alert();
  private AlertType = AlertType;

  private loginForm: LoginForm = new LoginForm();
  private rooms: Array<Room> = new Array<Room>();
  private requireOtp: boolean = false;;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

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
    this.loginForm = formLogin.value
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
