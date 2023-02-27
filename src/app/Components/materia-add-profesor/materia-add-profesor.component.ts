import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MateriaService } from 'src/app/Services/materia.service';
import { Materia } from 'src/app/Interfaces/materia.interface';
import { Profesor } from 'src/app/Interfaces/profesor.interface';
import { ProfesorService } from 'src/app/Services/profesor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-materia-add-profesor',
  templateUrl: './materia-add-profesor.component.html',
  styleUrls: ['./materia-add-profesor.component.css']
})

@Injectable()
export class MateriaAddProfesorComponent {
  profesores? : Profesor[]
  materia?: Materia
  materiaProfesorForm: FormGroup

 constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {id: number}, private profesorService: ProfesorService,
 private materiaService: MateriaService, private fb: FormBuilder) {
    this.materiaProfesorForm = this.fb.group({
      profesor_id: ['', Validators.required]
    })

    this.profesorService.getProfesores().subscribe((profesores)=>{
      this.profesores = profesores
    })
 }


  close() {
    this.dialog.closeAll()
  }

  onSubmit(value:number): void{
    this.materiaService.addProfesor(this.data.id, value).subscribe(() => location.reload());
  }
}
