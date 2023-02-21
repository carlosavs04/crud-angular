import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from 'src/app/Services/profesor.service';
import { Profesor } from 'src/app/Interfaces/profesor.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesores-create',
  templateUrl: './profesores-create.component.html',
  styleUrls: ['./profesores-create.component.css']
})

@Injectable()
export class ProfesoresCreateComponent {
  profesorForm: FormGroup;
  profesor?: Profesor;

  constructor(private fb: FormBuilder, private profesorService: ProfesorService, private router: Router) {
    this.profesorForm = this.fb.group({
      nombre: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      ap_materno: ['', Validators.required],
    });
  }

  onSubmit(values: Profesor) {
    if(this.profesorForm.valid) {
      this.profesorService.addProfesor(values).subscribe();
      this.router.navigate(['/profesores']);
    }
  }
}
