import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Profesor } from 'src/app/Interfaces/profesor.interface';
import { ProfesorService } from 'src/app/Services/profesor.service';

@Component({
  selector: 'app-delete-profesor-modal',
  templateUrl: './delete-profesor-modal.component.html',
  styleUrls: ['./delete-profesor-modal.component.css']
})

@Injectable()
export class DeleteProfesorModalComponent {
  profesor?: Profesor;
  constructor(public dialog: MatDialog, private profesorService: ProfesorService, @Inject(MAT_DIALOG_DATA) public data: {id: number}) { }

  close() {
    this.dialog.closeAll()
  }

  deleteObj() {
    this.profesorService.deleteProfesor(this.data.id).subscribe(() => location.reload());
    this.close();
  }
}
