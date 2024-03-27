import { Routes } from '@angular/router';

import { AskForPasswordResetComponent } from './components/ask-for-password-reset/ask-for-password-reset.component';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { GeneratePasswordComponent } from './components/generate-password/generate-password.component';
import { GetDataComponent } from './components/get-data/get-data.component';
import { GetPayloadTokenComponent } from './components/get-payload-token/get-payload-token.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm-account', component: ConfirmAccountComponent },
  { path: 'get-data', component: GetDataComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'ask-for-password-reset', component: AskForPasswordResetComponent },
  { path: 'generate-new-password', component: GeneratePasswordComponent },
  { path: 'get-payload-token', component: GetPayloadTokenComponent },
  { path: '**', redirectTo: 'home' },
];
