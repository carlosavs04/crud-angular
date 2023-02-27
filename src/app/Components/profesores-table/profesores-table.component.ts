import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/Services/profesor.service';
import { Profesor } from 'src/app/Interfaces/profesor.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProfesorModalComponent } from '../delete-profesor-modal/delete-profesor-modal.component';
import { UserService } from 'src/app/Services/user.service';
import { map } from 'rxjs/operators';
import { ProfesorAddMateriaComponent } from '../profesor-add-materia/profesor-add-materia.component';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { MateriaService } from 'src/app/Services/materia.service';
import { Materia } from 'src/app/Interfaces/materia.interface';

@Component({
  selector: 'app-profesores-table',
  templateUrl: './profesores-table.component.html',
  styleUrls: ['./profesores-table.component.css']
})
export class ProfesoresTableComponent implements OnInit {
  profesores?: Profesor[];
  filterForm: FormGroup;
  materias?: Materia[];

  constructor(private profesorService: ProfesorService, private router: Router, public dialog: MatDialog, private userService: UserService, private fb: FormBuilder, private materiaService: MateriaService) { 
    this.filterForm = this.fb.group({
      materia: ['', Validators.required],
    });

    this.materiaService.getMaterias().subscribe(materias => {
      this.materias = materias;
    });
  }

  iAdmin: boolean = false;

  ngOnInit() {
    this.getProfesores();
    this.isAdmin();
  }

  getProfesores() {
    if (localStorage.getItem('profesores') !== null) {
      this.profesores = JSON.parse(localStorage.getItem('profesores') || '{}');
      localStorage.removeItem('profesores');
    }

    else {
      this.profesorService.getProfesores().subscribe(
        profesores => this.profesores = profesores
      );
    }
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

  openAddModal(id: number) {
    const addDialog = this.dialog.open(ProfesorAddMateriaComponent, {
      height: '280px',
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

  onFilter(values: Profesor) {
    if(this.filterForm.valid) {
      this.profesorService.filterProfesores(Number(values.materia)).subscribe(response => {
        localStorage.setItem('profesores', JSON.stringify(response)), location.reload();});
    }
  } 
}

