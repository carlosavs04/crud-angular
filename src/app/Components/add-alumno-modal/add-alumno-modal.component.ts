import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from 'src/app/Interfaces/alumno.interface';
import { AlumnoService } from 'src/app/Services/alumno.service';

@Component({
  selector: 'app-add-alumno-modal',
  templateUrl: './add-alumno-modal.component.html',
  styleUrls: ['./add-alumno-modal.component.css']
})

@Injectable()
export class AddAlumnoModalComponent {
  addAlumnoForm: FormGroup;
  alumno?: Alumno;
  
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {id: number}, private alumnoService: AlumnoService, private fb: FormBuilder) { 
    this.addAlumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      ap_materno: ['', Validators.required],
      edad: [null, Validators.required],
      carrera_id: [this.data.id, Validators.required],
    });
  }

  close() {
    this.dialog.closeAll()
  }

  onSubmit(alumno: Alumno) {
    if(this.addAlumnoForm.valid) {
      this.alumnoService.addAlumno(alumno).subscribe();
      this.close();
    }
  }
}
