import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Interfaces/user.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { RolFormComponent } from '../rol-form/rol-form.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users?: User[];
  constructor(private userService: UserService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
  }

  getUser(id: number) {
    this.router.navigate(['/users', id]);
  }

  changeStatus(id: number) {
    this.userService.changeStatus(id).subscribe(() => location.reload());
  }

  openRolModal(id: number) {
    const dialogRef = this.dialog.open(RolFormComponent, {
      height: '283px',
      width: '500px',
      data: { id: id }
    });
  }
}
