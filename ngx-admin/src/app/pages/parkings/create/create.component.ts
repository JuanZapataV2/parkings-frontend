import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Parking } from "../../../models/parkings/parking.model";
import { ParkingService } from "../../../services/parkings/parking.service";
import { SecurityService } from "../../../services/security/security.service";
import { ParkingSpotService } from "../../../services/parkings/parkingSpot/parking-spot.service";
import { ParkingSpot } from "../../../models/parking-spots/parking-spot.model";

@Component({
  selector: "ngx-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class CreateComponent implements OnInit {
  createMode: boolean = true;
  parking_id: number;
  parking: Parking = {
    id: null,
    owner_id: null,
    name: null,
    address: null,
    telephone: null,
    number_spaces: null,
    open_hours: null,
    parking_owner: null,
    parking_spots: null,
  };
  endTime = {
    hour: 0,
    minute: 0,
  };
  beginTime = {
    hour: 0,
    minute: 0,
  };

  selectedDays = {
    day: "",
  };

  daysForm: FormGroup;
  days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  sendAttempt: boolean = false;

  constructor(
    private parkingSvc: ParkingService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private securitySvc: SecurityService,
    private formBuilder: FormBuilder,
    private parkingSpotSvc: ParkingSpotService
  ) {
    this.daysForm = this.formBuilder.group({
      day: this.formBuilder.array([], [Validators.required]),
    });
  }

  onCheckboxChange(e) {
    const day: FormArray = this.daysForm.get("day") as FormArray;
    if (e.target.checked) {
      day.push(new FormControl(e.target.value));
    } else {
      const index = day.controls.findIndex((x) => x.value === e.target.value);
      day.removeAt(index);
    }
  }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.params.id) {
      this.createMode = false;
      this.parking_id = this.activeRoute.snapshot.params.id;
      this.getParking(this.parking_id);
    } else {
      this.createMode = true;
    }
    if (this.securitySvc.UserSesionActiva.token != undefined) {
      this.parking.owner_id = this.securitySvc.UserSesionActiva.id;
    }
  }

  create(): void {
    this.getOpeningHours();
    if (this.validateData()) {
      this.sendAttempt = true;
      this.parkingSvc.create(this.parking).subscribe(async (data) => {
        this.parking.id = data.id;
        let parkingSpotsCreated = await this.createParkingSpots();
        if (parkingSpotsCreated) {
          Swal.fire(
            "Creado",
            "El parqueadero ha sido creado correctamente",
            "success"
          );
          this.router.navigate(["pages/parkings/list"]);
        }
      });
    } else {
      Swal.fire("Error", "Todos los campos deben ser llenados", "warning");
    }
  }

  update(): void {
    if (this.validateData()) {
      this.createParkingSpots();
      this.parkingSvc.update(this.parking).subscribe((data) => {
        Swal.fire(
          "Actualizado",
          "El parqueadero ha sido actualizado correctamente",
          "success"
        );
        this.router.navigate(["pages/users/list"]);
      });
    } else {
      Swal.fire("Error", "Todos los campos deben ser llenados", "warning");
    }
  }

  getParking(id: number) {
    this.parkingSvc.show(id).subscribe((data) => {
      this.parking = data;
    });
  }

  validateData(): boolean {
    this.sendAttempt = true;
    if (
      this.parking.name == "" ||
      this.parking.address == "" ||
      this.parking.number_spaces == null ||
      this.parking.telephone == "" ||
      this.parking.open_hours == null
    ) {
      return false;
    } else {
      return true;
    }
  }

  getOpeningHours() {
    let days = [];
    let schedule;
    for (let item in this.daysForm.controls) {
      days.push(this.daysForm.controls[item].value);
    }
    if (this.validateSchedule(days)) {
      schedule = {
        days: days[0],
        startTime: this.beginTime,
        endTime: this.endTime,
      };
      //console.log(JSON.stringify(schedule));
      this.parking.open_hours = JSON.stringify(schedule);
    } else {
      Swal.fire("Error", "El horario seleccionado es incorrecto", "error");
    }
  }
  validateSchedule(days): boolean {
    this.sendAttempt = true;
    if (days[0].length == 0 || this.beginTime.hour > this.endTime.hour) {
      return false;
    } else {
      return true;
    }
  }

  async createParkingSpots() {
    let parking_id = this.parking.id;
    for (let i = 0; i < this.parking.number_spaces; i++) {
      let spot: ParkingSpot = {
        parking_id: parking_id,
        code: "p" + i,
        occupied: false,
      };
      this.parkingSpotSvc.create(spot).subscribe((data) => {
        if (i === this.parking.number_spaces - 1) return true;
      });
    }
    setTimeout(() => {}, 5000);
    return true;
  }
}
