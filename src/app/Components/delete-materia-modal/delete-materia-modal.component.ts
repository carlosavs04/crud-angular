import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Materia } from 'src/app/Interfaces/materia.interface';
import { MateriaService } from 'src/app/Services/materia.service';

@Component({
  selector: 'app-delete-materia-modal',
  templateUrl: './delete-materia-modal.component.html',
  styleUrls: ['./delete-materia-modal.component.css']
})

@Injectable()
export class DeleteMateriaModalComponent {
  materia?: Materia;
  constructor(public dialog: MatDialog, private materiaService: MateriaService, @Inject(MAT_DIALOG_DATA) public data: {id: number}) { }


  close() {
    this.dialog.closeAll()
  }

  deleteObj() {
    this.materiaService.deleteMateria(this.data.id).subscribe(() => location.reload());
    this.close();
  }
}
