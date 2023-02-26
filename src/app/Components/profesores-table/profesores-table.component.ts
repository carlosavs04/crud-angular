import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/Services/profesor.service';
import { Profesor } from 'src/app/Interfaces/profesor.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProfesorModalComponent } from '../delete-profesor-modal/delete-profesor-modal.component';
import { UserService } from 'src/app/Services/user.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-profesores-table',
  templateUrl: './profesores-table.component.html',
  styleUrls: ['./profesores-table.component.css']
})
export class ProfesoresTableComponent implements OnInit {
  profesores?: Profesor[];
  constructor(private profesorService: ProfesorService, private router: Router, public dialog: MatDialog, private userService: UserService) { }

  iAdmin: boolean = false;

  ngOnInit() {
    this.getProfesores();
    this.isAdmin();
  }

  getProfesores() {
    this.profesorService.getProfesores().subscribe(
      profesores => this.profesores = profesores
    );
  }

  addMateria(id:number){
    this.router.navigate(['/profesor/add/materia',id])
  }

  updateProfesor(id: number) {
    this.router.navigate(['/profesores/update', id]);
  }

  deleteProfesor(id: number) {
    this.profesorService.deleteProfesor(id).subscribe();
  }

  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open(DeleteProfesorModalComponent, {
      height: '283px',
      width: '500px',
      data: { id: id }
    });
  }

  add() {
    this.router.navigate(['/profesores/create']);
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
