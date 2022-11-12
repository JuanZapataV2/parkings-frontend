import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/users/user.service";
import { User } from "../../../models/users/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "ngx-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  createMode: boolean = true;
  user_id: number;
  user: User = {
    name: "",
    email: "",
    password: "",
    role_id: 2,
  };
  sendAttempt: boolean = false;

  constructor(
    private userSvc: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.createMode = false;
      this.user_id = this.activeRoute.snapshot.params.id;
      this.getUser(this.user_id);
    } else {
      this.createMode = true;
    }
  }

  create(): void {
    if (this.validateData()) {
      this.sendAttempt = true;
      this.userSvc.create(this.user).subscribe((data) => {
        Swal.fire(
          "Creado",
          "El usuario ha sido creado correctamente",
          "success"
        );
        this.router.navigate(["pages/users/list"]);
      });
    } else {
      Swal.fire(
        "Error",
        "Todos los campos deben ser llenados",
        "warning"
      );

    }
  }

  update(): void {
    if (this.validateData()) {
      this.userSvc.update(this.user).subscribe((data) => {
        Swal.fire(
          "Actualizado",
          "El usuario ha sido actualizado correctamente",
          "success"
        );
        this.router.navigate(["pages/users/list"]);
      });
    } else {
      Swal.fire(
        "Error",
        "Todos los campos deben ser llenados",
        "warning"
      );
    }
  }

  getUser(id: number) {
    console.log("Buscando usuario", id);
    this.userSvc.show(id).subscribe((data) => {
      this.user = data[0];
    });
  }

  validateData(): boolean {
    this.sendAttempt = true;
    if (
      this.user.name == "" ||
      this.user.email == "" ||
      this.user.password == ""
    ) {
      return false;
    } else {
      return true;
    }
  }
}
