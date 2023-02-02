import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProtectedRouteService } from './services/protected-route.service';
import { PublicRouteService } from './services/public-route.service';


const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [PublicRouteService],
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [PublicRouteService],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ProtectedRouteService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
