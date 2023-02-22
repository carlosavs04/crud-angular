import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlumnoService } from 'src/app/Services/alumno.service';
import { Alumno } from 'src/app/Interfaces/alumno.interface';
import { CarreraService } from 'src/app/Services/carrera.service';
import { Carrera } from 'src/app/Interfaces/carrera.interface';


@Component({
  selector: 'app-filter-alumnos',
  templateUrl: './filter-alumnos.component.html',
  styleUrls: ['./filter-alumnos.component.css']
})

@Injectable()
export class FilterAlumnosComponent {
  filterForm: FormGroup;
  carreras?: Carrera[];

  constructor(private fb: FormBuilder, private alumnoService: AlumnoService, private carreraService: CarreraService) {
    this.filterForm = this.fb.group({
      carrera: ['', Validators.required],
    });

    this.carreraService.getCarreras().subscribe(carreras => {
      this.carreras = carreras;
    });
  }

  onSubmit(values: Alumno) {
    if(this.filterForm.valid) {
      this.alumnoService.filterAlumnos(Number(values.carrera)).subscribe(response => {
        localStorage.setItem('alumnos', JSON.stringify(response))});
    }
  }
}
