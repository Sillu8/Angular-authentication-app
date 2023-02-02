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
      localStorage.setItem('jwt','true');
      this.router.navigate(['home']);
    } catch (error: any) {
      console.log(error)
    } 
  }



  async register(email: string, password: string){
    try {
      await this.fireauth.createUserWithEmailAndPassword(email,password)
      localStorage.setItem('jwt','true');
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
      this.router.navigate(['signup'])
    }
  }


  async logout(){
    try {
      await this.fireauth.signOut();
      localStorage.removeItem('jwt');
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}
