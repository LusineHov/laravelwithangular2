import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { User }                from '../_models/user';
import { UserService } from '../_services/user.service';
import { ValidationService } from '../_services/validation.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
	moduleId: module.id,
  	selector: 'app-registration',
  	templateUrl: './registration.component.html',
  	styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
	// users: Array<User> = [];
	// registerForm: any;
	registerForm: FormGroup;

    // constructor(private formBuilder: FormBuilder,
    // 	private router: Router,
    //     private userService: UserService) {
	   //      this.registerForm = this.formBuilder.group({
	   //    	'username': ['', Validators.required],
	   //    	'password': ['', [Validators.required, Validators.minLength(6)]]
	   //  	});
	   //   }

    constructor(private router: Router,
    	private userService: UserService) {
    	let name = new FormControl('', Validators.required);
    	let email = new FormControl('', Validators.required);
    	let password = new FormControl('', [Validators.required, Validators.minLength(6)]);
		let password_confirmation = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

		this.registerForm = new FormGroup({
		  name: name,
		  email: email,
		  password: password,
		  password_confirmation: password_confirmation
		});
	}

 //    register(): void {
 //    	if (this.registerForm.dirty && this.registerForm.valid) {
 //    		console.log(this.registerForm.value)
	// 	  	this.userService.create(this.registerForm.value)
	// 	    .then(user => {
	// 	    	this.router.navigate(['/login']);
	// 	      	// this.users.push(user);
	// 	    });
	// 	  	// console.log(this.userService.getAll())
	// 	}
	// }
	 register() {
        this.userService.create(this.registerForm.value)
            .subscribe(
                data => {
                	console.log('qqqq')
                    this.router.navigate(['/login']);
                },
                error => {
                	console.log(error)
                });
    }
}
