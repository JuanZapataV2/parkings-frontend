import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/users/user.model';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = ["Id","Name","Email", "Rol", "Options"]
  users:User[];

  constructor(private svcUsers: UserService) { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(): void {
    this.svcUsers.index().subscribe(users =>{
      console.log(users);
      this.users = users;
    });
  }

  deleteUser(id:string):void{
    Swal.fire({
      title: 'Eliminar usuario',
      text: "Está seguro que quiere eliminar el usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.svcUsers.destroy(id).
          subscribe(data => {
            Swal.fire(
              'Eliminado!',
              'El usuario ha sido eliminada correctamente',
              'success'
            )
            this.ngOnInit();
          });
      }
    })
  }


  editUser(id:number): void {
    // Falta implementar :v
    // console.log("Editando a: ", id);
    // this.svcUsers.destroy(id).subscribe(users =>{
    //   console.log(users);
    //   this.users = users;
    // });
  }

}
