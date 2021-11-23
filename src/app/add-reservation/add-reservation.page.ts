import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.page.html',
  styleUrls: ['./add-reservation.page.scss'],
})
export class AddReservationPage implements OnInit {

  constructor(private router:Router, private authSvc:AuthService) { }

  ngOnInit() {
  }

  async onLogout(){
    try {
      await this.authSvc.logout();
      this.router.navigate(['home']);
    } catch (error) {
      console.log("Error=>",error)
    }
  }
}
