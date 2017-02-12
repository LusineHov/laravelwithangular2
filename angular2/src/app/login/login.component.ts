import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { AuthenticationService } from '../_services/authentication.service';
import { ValidationService } from '../_services/validation.service';
import { CustomValidators } from 'ng2-validation';

@Component({
	moduleId: module.id,
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    errorMessage: string;
    returnUrl: string;
    loginForm: FormGroup;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {
            let email = new FormControl('', [Validators.required, Validators.maxLength(255), CustomValidators.email]);
            let password = new FormControl('', [Validators.required, Validators.minLength(6)]);

            this.loginForm = new FormGroup({
              email: email,
              password: password
            });
        }

    ngOnInit() {
    	this.authenticationService.logout();
        this.returnUrl = '/dashboard';
    }

    login() {
        this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.errorMessage = <any>error;
                });
    }
}

