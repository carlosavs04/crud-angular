import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from 'src/app/Services/alumno.service';
import { Alumno } from 'src/app/Interfaces/alumno.interface';
import { CarreraService } from 'src/app/Services/carrera.service';
import { Carrera } from 'src/app/Interfaces/carrera.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos-create',
  templateUrl: './alumnos-create.component.html',
  styleUrls: ['./alumnos-create.component.css']
})

@Injectable()
export class AlumnosCreateComponent {
  alumnoForm: FormGroup;
  alumno?: Alumno;
  carreras?: Carrera[];

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService, private carreraService: CarreraService, private router: Router) {
    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      ap_materno: ['', Validators.required],
      edad: [null, Validators.required],
      carrera_id: ['', Validators.required],
    });

    this.carreraService.getCarreras().subscribe(carreras => {
      this.carreras = carreras;
    });
  }

  onSubmit(values: Alumno) {
    if(this.alumnoForm.valid) {
      this.alumnoService.addAlumno(values).subscribe();
      this.router.navigate(['/alumnos']);
    }
  }
}
