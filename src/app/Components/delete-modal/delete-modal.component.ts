import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Alumno } from 'src/app/Interfaces/alumno.interface';
import { AlumnoService } from 'src/app/Services/alumno.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})

@Injectable()
export class DeleteModalComponent {
  alumno?: Alumno;
  constructor(public dialog: MatDialog, private alumnoService: AlumnoService, @Inject(MAT_DIALOG_DATA) public data: {id: number}) { }

  close() {
    this.dialog.closeAll()
  }

  deleteObj() {
    this.alumnoService.deleteAlumno(this.data.id).subscribe(() => location.reload());
    this.close();
  }

}
