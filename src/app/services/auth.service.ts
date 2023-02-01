import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }


  async login(email: string, password: string){
    try {
      await this.fireauth.signInWithEmailAndPassword(email,password)
      localStorage.setItem('token','true');
      this.router.navigate(['home']);
    } catch (error: any) {
      alert(error.message);
      console.log(error);
      this.router.navigate(['login'])
    }
  }



  async register(email: string, password: string){
    try {
      await this.fireauth.createUserWithEmailAndPassword(email,password)
      localStorage.setItem('token','true');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
      this.router.navigate(['signup'])
    }
  }


  async logout(){
    try {
      await this.fireauth.signOut();
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
