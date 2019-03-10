import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { appLiterals } from '../../resources/appLiteral';

import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  appLiterals;
  authService: AuthService

  constructor(private authSrv: AuthService, private router: Router, private flashMessage: FlashMessagesService) {
    this.appLiterals = appLiterals;
    this.authService = authSrv;
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show(this.appLiterals.login.logoutConfirmationMsg, {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }

}
