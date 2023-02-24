import { Component, OnInit } from '@angular/core';
import { CarreraService } from 'src/app/Services/carrera.service';
import { Carrera } from 'src/app/Interfaces/carrera.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteCarreraModalComponent } from '../delete-carrera-modal/delete-carrera-modal.component';
import { AddAlumnoModalComponent } from '../add-alumno-modal/add-alumno-modal.component';
import { UserService } from 'src/app/Services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-carreras-table',
  templateUrl: './carreras-table.component.html',
  styleUrls: ['./carreras-table.component.css']
})
export class CarrerasTableComponent implements OnInit {
  carreras?: Carrera[];
  constructor(private carreraService: CarreraService, private router: Router, public dialog: MatDialog, private userService: UserService) { }

  iAdmin: boolean = false;

  ngOnInit() {
    this.getCarreras();
    this.isAdmin();
  }

  getCarreras() {
    this.carreraService.getCarreras().subscribe(
      carreras => this.carreras = carreras
    );
  }

  updateCarrera(id: number) {
    this.router.navigate(['/carreras/update', id]);
  }

  deleteCarrera(id: number) {
    this.carreraService.deleteCarrera(id).subscribe();
  }

  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open(DeleteCarreraModalComponent, {
      height: '283px',
      width: '500px',
      data: { id: id }
    });
  }

  openAddModal(id: number) {
    const addDialog = this.dialog.open(AddAlumnoModalComponent, {
      height: '483px',
      width: '500px',
      data: { id: id }
    });
  }

  add() {
    this.router.navigate(['/carreras/create']);
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
}
