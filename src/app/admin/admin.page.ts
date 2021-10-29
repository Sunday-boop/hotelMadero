import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { async } from '@firebase/util';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage{

  constructor(private router:Router, private authSvc:AuthService) { }

  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['home']);
    } catch (error) {
      console.log("Error=>",error)
    }
  }

}
