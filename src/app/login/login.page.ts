import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  constructor(private authSvc: AuthService, private router:Router) { }

  async onLogin(email, password){
    if(email.value == "l17121088@morelia.tecnm.mx" ){
      try {
           const user = await this.authSvc.login(email.value, password.value);
           if (user) {
             const isVerified = this.authSvc.isEmailVerified(user);
             this.redirectUser(isVerified);
           }
         } catch (error) {
           console.log("Error=>",error)
         }
     }else{
       try {
         const user = await this.authSvc.login(email.value, password.value);
         if (user) {
           const isVerified = this.authSvc.isEmailVerified(user);
           this.redirectUserC(isVerified);
         }
         
       } catch (error) {
         console.log("Error=>",error)
       }
     
     
     }
  }

  async onLoginGoogle(){
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log("Error=>",error)
    }
  }

  private redirectUser(isVerified:boolean): void{
    if (isVerified) {
      this.router.navigate(['admin'])
    }else{
      this.router.navigate(['verify-email'])
    }
  }

  private redirectUserC(isVerified:boolean): void{
    if (isVerified) {
      this.router.navigate(['busqueda'])
    }else{
      this.router.navigate(['verify-email'])
    }
  }
}
