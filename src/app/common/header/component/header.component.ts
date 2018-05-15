import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../user/login/service/LoginService';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() { }

  logout() {
    this.loginService.logout();
  }
}
