import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from 'src/app/Services/materia.service';
import { Materia } from 'src/app/Interfaces/materia.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materias-create',
  templateUrl: './materias-create.component.html',
  styleUrls: ['./materias-create.component.css']
})

@Injectable()
export class MateriasCreateComponent {
  materiaForm: FormGroup;
  materia?: Materia;

  constructor(private fb: FormBuilder, private materiaService: MateriaService, private router: Router) {
    this.materiaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  onSubmit(values: Materia) {
    if(this.materiaForm.valid) {
      this.materiaService.addMateria(values).subscribe();
      this.router.navigate(['/materias']);
    }
  }
}
