import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private toast: NgToastService,
    private spinner: NgxSpinnerService
  ) {}

  async login(email: string, password: string) {
    try {
      this.spinner.show();
      await this.fireauth.signInWithEmailAndPassword(email, password);
      this.toast.success({ summary: 'Successfully logged in!' });
      localStorage.setItem('jwt', 'true');
      this.router.navigate(['home']);
    } catch (error: any) {
      this.toast.error({ summary: error.message });
    } finally {
      this.spinner.hide();
    }
  }

  async register(email: string, password: string) {
    try {
      this.spinner.show();
      await this.fireauth.createUserWithEmailAndPassword(email, password);
      this.toast.success({ summary: 'Successfully created account!' });
      this.router.navigate(['/']);
    } catch (error: any) {
      this.toast.error({ summary: error.message });
    } finally {
      this.spinner.hide();
    }
  }

  async logout() {
    try {
      this.spinner.show()
      await this.fireauth.signOut();
      localStorage.removeItem('jwt');
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    } finally {
      this.spinner.hide();
    }
  }
}
