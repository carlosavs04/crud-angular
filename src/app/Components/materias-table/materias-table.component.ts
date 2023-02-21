import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/Services/materia.service';
import { Materia } from 'src/app/Interfaces/materia.interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMateriaModalComponent } from '../delete-materia-modal/delete-materia-modal.component';
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

  isLogged: boolean = false;
  iAdmin: boolean = false;

  ngOnInit() {
    this.getMaterias();
    this.isAdmin();
    this.getToken();
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