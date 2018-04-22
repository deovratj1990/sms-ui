import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private requireOtp: boolean = false;

  private loginValidation: any = { mobile: false };

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() { }

  login(f) {
    this.loginService.login(f.value)
      .subscribe((response: Response) => {

        let res = response.json();

        if (res['data'].requireOtp) {
          this.requireOtp = true;
        } else {
          if (res['data'].token) {
            localStorage.setItem('token', res['data'].token);
            this.router.navigate(['/dashboard']);
          }
        }

      });
  }

  validateMobile($event) {
    this.loginValidation.mobile = false;
    let mobile = $event.srcElement.value;
    if ((mobile as string).length === 10) {
      this.loginValidation.mobile = true;
    }
  }
}
