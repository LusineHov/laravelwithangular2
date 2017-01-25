import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { CardService } from './_services/card.service';
import { UserData } from './user-data';
import { CardComponent } from './card/card.component';
import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from './_services/validation.service';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'cards/:id', component: CardComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    ControlMessagesComponent,
    CardComponent
  ],
  imports: [    
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [ AuthGuard,
        AuthenticationService,
        UserService,
        CardService,
        ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
