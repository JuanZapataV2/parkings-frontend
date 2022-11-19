import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { SecurityService } from "../../../services/security/security.service";
import {User} from '../../../models/users/user.model';

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  constructor(private SecuritySvc: SecurityService, private router: Router) {}

  /**
   * Método que se ejecuta una vez se carga la página
   */
  ngOnInit(): void {}
  /**
   * Este método permite llevar a cabo el proceso de login,
   * llamando al método correspondiente de los servicios
   * para solicitar la validación al backend
   */
  login(): void {
    console.log("Email " + this.email + " contraseña " + this.password);
    let theUser: User = {
      email: this.email,
      password: this.password,
    };
    this.SecuritySvc.login(theUser).subscribe(
      (data) => {
        this.SecuritySvc.guardarDatosSesion(data);
        this.router.navigate(["pages/dashboard"]);
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: "Login error, try again with correct credentials",
          //text: error["error"]["message"],
          icon: "error",
          timer: 5000,
        });
      }
    );
  }
}
