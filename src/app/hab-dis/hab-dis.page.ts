import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-hab-dis',
  templateUrl: './hab-dis.page.html',
  styleUrls: ['./hab-dis.page.scss'],
})
export class HabDisPage implements OnInit {

  constructor(private router:Router, private authSvc:AuthService, private menucontroler: MenuController) { }

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

  openMenu(){
    this.menucontroler.toggle('client-menu')
  }
}
