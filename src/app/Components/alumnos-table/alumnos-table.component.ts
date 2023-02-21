import { Component, OnInit } from '@angular/core';
import { AlumnoService } from 'src/app/Services/alumno.service';
import { Alumno } from 'src/app/Interfaces/alumno.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UserService } from 'src/app/Services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alumnos-table',
  templateUrl: './alumnos-table.component.html',
  styleUrls: ['./alumnos-table.component.css']
})
export class AlumnosTableComponent implements OnInit {
  alumnos?: Alumno[];
  constructor(private alumnoService: AlumnoService, private router: Router, public dialog: MatDialog, private userService: UserService) { }

  isLogged: boolean = false;
  iAdmin: boolean = false;

  ngOnInit() {
    this.getAlumnos();
    this.isAdmin();
    this.getToken();
  }

  getAlumnos() {
    if (localStorage.getItem('alumnos') !== null) {
      this.alumnos = JSON.parse(localStorage.getItem('alumnos') || '{}');
      localStorage.removeItem('alumnos');
    }

    else {
      this.alumnoService.getAlumnos().subscribe(
      alumnos => this.alumnos = alumnos);
    }
  }

  updateAlumno(id: number) {
    this.router.navigate(['/alumnos/update', id]);
  }

  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      height: '283px',
      width: '500px',
      data: { id: id }
    });
  }

  deleteAlumno(id: number) {
    this.alumnoService.deleteAlumno(id).subscribe();
  }

  add() {
    this.router.navigate(['/alumnos/create']);
  }

  isAdmin() {
    this.userService.isAdmin().pipe(
      map(isAdmin => {
        if(isAdmin) {
          this.iAdmin = true;
        } else {
          this.iAdmin = false;
        }
      })
    ).subscribe(response => console.log(response));
  }

  getToken() {
    this.userService.getToken().pipe(
      map(token => { 
        if(token) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      })
    ).subscribe(response => console.log(response));
  }
}
