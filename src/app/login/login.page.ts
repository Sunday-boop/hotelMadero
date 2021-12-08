import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { FirestoreService } from '../services/firestore.service';
import { Usuario } from '../shared/userinterface';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public myGlobalVar: string
  public cou: string

  constructor(private authSvc: AuthService, private router: Router, private database: AngularFirestore, private database2: FirestoreService) { }



  async onLogin(email, password) {
    this.cou = "s"
    const user = await this.authSvc.login(email.value, password.value);
    const path = 'Usuario/'
    await this.database2.getCollectionConsulta<Usuario>(path, 'correo', email.value).subscribe(res => {
    //  console.log("c siclo en en")
      this.myGlobalVar = res[0].tipoU
      if (this.cou == "s") {
        this.g(this.myGlobalVar, user);
        this.cou = "n"
      }
    });

  }

  g(g, u) {
    this.myGlobalVar = g;
   // console.log("iiii" + this.myGlobalVar)
    this.redireccion(u)

  }

  redireccion(u) {
    //console.log("c podra'" + this.myGlobalVar)
    if (this.myGlobalVar == "Administrador") {
      try {
        if (u) {
          const isVerified = this.authSvc.isEmailVerified(u);
          this.redirectUser(isVerified);
        }
      } catch (error) {
        console.log("Error=>", error)
      }
    } else {
      try {
        if (u) {
          const isVerified = this.authSvc.isEmailVerified(u);
          this.redirectUserC(isVerified);
        }

      } catch (error) {
        console.log("Error=>", error)
      }
    }
  }


  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log("Error=>", error)
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['admin'])

    } else {
      this.router.navigate(['verify-email'])
    }
  }

  private redirectUserC(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['busqueda'])
    } else {
      this.router.navigate(['verify-email'])
    }
  }
}
