import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from 'src/app/Services/alumno.service';
import { Alumno } from 'src/app/Interfaces/alumno.interface';
import { CarreraService } from 'src/app/Services/carrera.service';
import { Carrera } from 'src/app/Interfaces/carrera.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alumnos-update',
  templateUrl: './alumnos-update.component.html',
  styleUrls: ['./alumnos-update.component.css']
})

@Injectable()
export class AlumnosUpdateComponent implements OnInit {
  alumnoForm: FormGroup;
  alumno?: Alumno;
  carreras?: Carrera[];
  id?: number;

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService, private carreraService: CarreraService, private router: Router, private route: ActivatedRoute) {
    this.alumnoForm = this.fb.group({
      nombre: [this.alumno?.nombre, Validators.required],
      ap_paterno: [this.alumno?.ap_paterno, Validators.required],
      ap_materno: [this.alumno?.ap_materno, Validators.required],
      edad: [this.alumno?.edad, Validators.required],
      carrera_id: ['', Validators.required],
    });

    this.carreraService.getCarreras().subscribe(carreras => {
      this.carreras = carreras;
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.alumnoService.getAlumno(this.id).subscribe(alumno => 
      this.alumnoForm.patchValue(alumno))
  }

  onSubmit(values: Alumno) {
    if(this.alumnoForm.valid) {
      this.alumnoService.updateAlumno(values, Number(this.route.snapshot.paramMap.get('id'))).subscribe();
      this.router.navigate(['/alumnos']);
    }
  }
}
