import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  columns:string[] = ["Id","Name","Email"]
  users:User[]=[
    {
      id: 1,
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '1234'
    },
    {
      id: 1,
      name: 'Pepe Doe',
      email: 'john3@gmail.com',
      password: 'pepe'
    },
    {
      id: 1,
      name: 'Charles Doe',
      email: 'john2@gmail.com',
      password: '12345'
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers(): void {
    this.users.forEach(user => {
      console.log(user.name);
    });
  }

}
