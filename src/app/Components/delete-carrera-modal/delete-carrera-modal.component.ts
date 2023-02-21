import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Carrera } from 'src/app/Interfaces/carrera.interface';
import { CarreraService } from 'src/app/Services/carrera.service';

@Component({
  selector: 'app-delete-carrera-modal',
  templateUrl: './delete-carrera-modal.component.html',
  styleUrls: ['./delete-carrera-modal.component.css']
})

@Injectable()
export class DeleteCarreraModalComponent {
  carrera?: Carrera;
  constructor(public dialog: MatDialog, private carreraService: CarreraService, @Inject(MAT_DIALOG_DATA) public data: {id: number}) { }

  close() {
    this.dialog.closeAll()
  }

  deleteObj() {
    this.carreraService.deleteCarrera(this.data.id).subscribe(() => location.reload());
    this.close();
  }
}
