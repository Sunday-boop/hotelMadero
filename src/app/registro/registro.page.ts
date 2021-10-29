import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit() {
  }

  async onRegister(email, password){
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }  
    } catch (error) {
      console.log('Error', error)
    }
  }

  private redirectUser(isVerified:boolean): void{
    if (isVerified) {
      this.router.navigate(['admin'])
    }else{
      this.router.navigate(['verify-email'])
    }
  }
}
