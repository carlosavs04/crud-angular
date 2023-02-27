import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ProfesorService } from 'src/app/Services/profesor.service';
import { Profesor } from 'src/app/Interfaces/profesor.interface';
import { MateriaService } from 'src/app/Services/materia.service';
import { Materia } from 'src/app/Interfaces/materia.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-profesor-add-materia',
  templateUrl: './profesor-add-materia.component.html',
  styleUrls: ['./profesor-add-materia.component.css']
})

@Injectable()
export class ProfesorAddMateriaComponent {
  profesor? : Profesor
  materias?: Materia[]
  profesorMateriaForm: FormGroup

 constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {id: number}, private profesorService: ProfesorService,
 private materiaService: MateriaService, private fb: FormBuilder) {
    this.profesorMateriaForm = this.fb.group({
      materia_id: ['', Validators.required]
    });

    this.materiaService.getMaterias().subscribe((materias)=>{
      this.materias = materias
    });
 }

  close() {
    this.dialog.closeAll()
  }

 onSubmit(value:number): void {
  this.profesorService.addMateria(this.data.id, value).subscribe(() => location.reload());
 }
}
