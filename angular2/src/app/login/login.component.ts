import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../_services/authentication.service';
import { ValidationService } from '../_services/validation.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
	moduleId: module.id,
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    returnUrl: string;
    loginForm: FormGroup;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {
            let username = new FormControl('', Validators.required);
            let password = new FormControl('', [Validators.required, Validators.minLength(6)]);
            this.loginForm = new FormGroup({
              username: username,
              password: password
            });
        }

    ngOnInit() {
    	this.authenticationService.logout();
        this.returnUrl = '/dashboard';
    }

    login() {
        if (this.loginForm.dirty && this.loginForm.valid) {
            this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password)
                .subscribe(
                    data => {
                    	if (localStorage.getItem("currentUser") !== null) {
                        	this.router.navigate([this.returnUrl]);
    					}
                    },
                    error => {
                    });
            }
    }
}

