import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../_services/user.service';
import { ValidationService } from '../_services/validation.service';
import { CustomValidators } from 'ng2-validation';

@Component({
	moduleId: module.id,
  	selector: 'app-registration',
  	templateUrl: './registration.component.html',
  	styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
	errorMessage: string;
	registerForm: FormGroup;

    constructor(private router: Router,
    	private userService: UserService) {
    	let name = new FormControl('', [Validators.required, Validators.maxLength(255)]);
    	let email = new FormControl('', [Validators.required, Validators.maxLength(255), CustomValidators.email]);
    	let password = new FormControl('', [Validators.required, Validators.minLength(6)]);
		let password_confirmation = new FormControl('', [CustomValidators.equalTo(password)]);

		this.registerForm = new FormGroup({
		  name: name,
		  email: email,
		  password: password,
		  password_confirmation: password_confirmation
		});
	}

	register() {
        this.userService.create(this.registerForm.value)
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                	this.errorMessage = <any>error;
                });
    }
}
