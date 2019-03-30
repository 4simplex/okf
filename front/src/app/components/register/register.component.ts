import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ValidateService } from './../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { appLiterals } from '../../resources/appLiteral';

export interface FormModel {
  captcha?: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formModel: FormModel = {};
  name: String;
  username: String;
  email: String;
  password: String;
  appLiterals;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) {
      this.appLiterals = appLiterals;
    }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show(this.appLiterals.register.fillAllFieldsMsg, {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show(this.appLiterals.register.useValidEmailMsg, {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user)
      .subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/register']);
        }
      });
  }

}
