import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { appLiterals } from '../../resources/appLiteral';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appLiterals;
  authService: AuthService

  constructor(
    private authSrv: AuthService, private router: Router, private flashMessage: FlashMessagesService) {
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
