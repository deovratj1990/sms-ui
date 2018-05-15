import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../../../user/login/service/LoginService';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( 
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate() {
    if(this.loginService.isLoggedIn()) return true;

    this.router.navigate(['/login']);
    return false;

  }


}
