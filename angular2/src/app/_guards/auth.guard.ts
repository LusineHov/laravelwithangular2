import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    	let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.api_token) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}