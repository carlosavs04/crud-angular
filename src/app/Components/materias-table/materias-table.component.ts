import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/Services/materia.service';
import { Materia } from 'src/app/Interfaces/materia.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMateriaModalComponent } from '../delete-materia-modal/delete-materia-modal.component';
import { MateriaAddProfesorComponent } from '../materia-add-profesor/materia-add-profesor.component';
import { UserService } from 'src/app/Services/user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-materias-table',
  templateUrl: './materias-table.component.html',
  styleUrls: ['./materias-table.component.css']
})
export class MateriasTableComponent implements OnInit {
  materias?: Materia[];
  constructor(private materiaService: MateriaService, private router: Router, public dialog: MatDialog, private userService: UserService) { }

  iAdmin: boolean = false;

  ngOnInit() {
    this.getMaterias();
    this.isAdmin();
  }

  getMaterias() {
    this.materiaService.getMaterias().subscribe(
      materias => this.materias = materias
    );
  }

  updateMateria(id: number) {
    this.router.navigate(['/materias/update', id]);
  }

  deleteMateria(id: number) {
    this.materiaService.deleteMateria(id).subscribe();
  }

  openAddModal(id: number) {
    const addDialog = this.dialog.open(MateriaAddProfesorComponent, {
      height: '306px',
      width: '500px',
      data: { id: id }
    });
  }

  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open(DeleteMateriaModalComponent, {
      height: '283px',
      width: '500px',
      data: { id: id }
    });
  }

  add() {
    this.router.navigate(['/materias/create']);
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
