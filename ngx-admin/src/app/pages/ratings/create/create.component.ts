import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { RoleService } from '../../../services/roles/role.service';
import { Role } from '../../../models/roles/role.model';
import { ParkingRating } from "../../../models/parking-ratings/parking-rating.model";
import { ParkingRatingService } from "../../../services/parkings/parkingRating/parking-rating.service";
import { SecurityService } from "../../../services/security/security.service";
import { User } from "../../../models/users/user.model";

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  createMode: boolean = true;
  rating_id: number;

  rating: ParkingRating = {
    comment : "",
    rating : null,
    user_id: null,
    parking_id: null

  };
  sendAttempt: boolean = false;
  user: User;

  constructor(
    private ratingSvc: ParkingRatingService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private securitySvc: SecurityService,

  ) { }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.createMode = false;
      this.rating_id = this.activeRoute.snapshot.params.id;
      this.getRating(this.rating_id);
    } else {
      this.createMode = true;
    }
    if (this.securitySvc.UserSesionActiva.token != undefined) {
      this.user = this.securitySvc.UserSesionActiva
    }
  }

  create(): void {
    if (this.validateData()) {
      this.sendAttempt = true;
      this.ratingSvc.create(this.rating).subscribe((data) => {
        Swal.fire(
          "Creado",
          "La reseña ha sido creado correctamente",
          "success"
        );
        this.router.navigate(["pages/ratings/list"]);
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

      this.ratingSvc.update(this.rating).subscribe((data) => {
        Swal.fire(
          "Actualizado",
          "La reseña ha sido actualizado correctamente",
          "success"
        );
        this.router.navigate(["pages/ratings/list"]);
      });
    } else {
      Swal.fire(
        "Error",
        "Todos los campos deben ser llenados",
        "warning"
      );
    }
  }

  getRating(id: number) {
    console.log("Buscando reseña", id);
    this.ratingSvc.show(id).subscribe((data) => {
      this.rating = data;
    });
  }

  validateData(): boolean {
    this.sendAttempt = true;
    if (
      this.rating.rating == null ||
      this.rating.parking_id == null ||
      this.rating.user_id == null ||
      this.rating.comment == ""
    ) {
      return false;
    } else {
      return true;
    }
  }

}
