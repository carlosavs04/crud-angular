import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarreraService } from 'src/app/Services/carrera.service';
import { Carrera } from 'src/app/Interfaces/carrera.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carreras-create',
  templateUrl: './carreras-create.component.html',
  styleUrls: ['./carreras-create.component.css']
})

@Injectable()
export class CarrerasCreateComponent {
  carreraForm: FormGroup;
  carrera?: Carrera;

  constructor(private fb: FormBuilder, private carreraService: CarreraService, private router: Router) {
    this.carreraForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  onSubmit(values: Carrera) {
    if(this.carreraForm.valid) {
      this.carreraService.addCarrera(values).subscribe();
      this.router.navigate(['/carreras']);
    }
  }
}
