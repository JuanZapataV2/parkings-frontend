import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { UserService } from "../../../services/users/user.service";
import { User } from "../../../models/users/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { SecurityService } from "../../../services/security/security.service";

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  user: User;
  constructor(private userService: UserService,
    private SecuritySvc: SecurityService, private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    if (this.SecuritySvc.UserSesionActiva.id != undefined) {
      this.userService.show(this.SecuritySvc.UserSesionActiva.id)
      .subscribe((user: User) => {
        this.user = user[0];
        this.SecuritySvc.logout();
        Swal.fire(
          "Sesión cerrada con exito",
          "Su sesión ha sido cerrada exitosamente. Vuelva pronto"+this.user.name,
          "success"
        );
        this.router.navigate(["pages/dashboard"]);});
    } else {
      Swal.fire(
        "Error",
        "Ocurrión un error cerrando sesión",
        "warning"
      );
    }
  }

}
