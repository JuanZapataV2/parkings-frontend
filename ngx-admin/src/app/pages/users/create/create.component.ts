import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/users/user.service";
import { User } from "../../../models/users/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { RoleService } from '../../../services/roles/role.service';
import { Role } from '../../../models/roles/role.model';
import { SecurityService } from '../../../services/security/security.service';

import { environment } from '../../../../environments/environment';
import { DriverService } from '../../../services/users/drivers/driver.service';
import { ParkingOwnerService } from '../../../services/users/parkingOwners/parking-owner.service';
import { Driver } from '../../../models/drivers/driver.model';
import { ParkingOwner } from '../../../models/parking-owners/parking-owner.model';
@Component({
  selector: "ngx-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  createMode: boolean = true;
  user_id: number;
  roles:Role[]=[];
  selectedRole:Role;
  idRoleSelected:number;
  adminMode:boolean = false;
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
    private router: Router,
    private roleSvc:RoleService,
    private securitySvc:SecurityService, 
    private driverSvc: DriverService, 
    private parkingOwnerSvc:ParkingOwnerService,
  ) {}

  ngOnInit(): void {
    this.getRoles();
    if (this.activeRoute.snapshot.params.id) {
      this.createMode = false;
      this.user_id = this.activeRoute.snapshot.params.id;
      this.getUser(this.user_id);
    } else {
      this.createMode = true;
    }

    if (this.securitySvc.sesionExiste() && this.securitySvc.verificarRolSesion(environment.ADMIN_ID)) {
      this.adminMode = true;
    } else {
      this.adminMode = false;
    }
  }

  create(): void {
    this.user.role_id = this.idRoleSelected;
    if (this.validateData()) {
      this.sendAttempt = true;
      this.userSvc.create(this.user).subscribe((data) => {
        Swal.fire(
          "Creado",
          "El usuario ha sido creado correctamente",
          "success"
        );
        if(this.user.role_id == 3) {
          let parkingOwner ={
            "user_id": data.id,
          }
          console.log(ParkingOwner);
          this.parkingOwnerSvc.create(parkingOwner).
            subscribe((data) => {console.log("Nuevo due??o de parqueadero", data)});
        } else if(this.user.role_id == 4){
          let driver:Driver ={
            "user_id": data.id,
          }
          this.driverSvc.create(driver).
            subscribe((data) => {console.log("Nuevo conductor")});
        }
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
    this.user.role_id = this.idRoleSelected;
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
      this.idRoleSelected = this.user.role_id;
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

  getRoles(){
    this.roleSvc.index().subscribe(roles=>{
      this.roles = roles;
      if(!this.adminMode){
        this.roles.splice(0, 2);
      } 
      
    });
  }
}
