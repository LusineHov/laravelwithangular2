import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { CardService } from './_services/card.service';
import { SocketsService } from './_services/sockets.service';
import { CardComponent } from './card/card.component';
import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from './_services/validation.service';
import { FilterPipe } from './filter.pipe';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'cards/:id/edit', component: CardComponent },
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
    CardComponent,
    FilterPipe
  ],
  imports: [    
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    JsonpModule 
    // InMemoryWebApiModule.forRoot(InMemoryDataService, {passThruUnknownUrl: true})
  ],
  providers: [ AuthGuard,
        AuthenticationService,
        UserService,
        CardService,
        SocketsService,
        ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
