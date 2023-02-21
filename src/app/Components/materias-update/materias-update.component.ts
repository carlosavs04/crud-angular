import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MateriaService } from 'src/app/Services/materia.service';
import { Materia } from 'src/app/Interfaces/materia.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-materias-update',
  templateUrl: './materias-update.component.html',
  styleUrls: ['./materias-update.component.css']
})

@Injectable()
export class MateriasUpdateComponent implements OnInit {
  materiaForm: FormGroup;
  materia?: Materia;
  id?: number;

  constructor(private fb: FormBuilder, private materiaService: MateriaService, private router: Router, private route: ActivatedRoute) {
    this.materiaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.materiaService.getMateria(this.id).subscribe(materia => 
      this.materiaForm.patchValue(materia))
  }

  onSubmit(values: Materia) {
    if(this.materiaForm.valid) {
      this.materiaService.updateMateria(values, Number(this.route.snapshot.paramMap.get('id'))).subscribe();
      this.router.navigate(['/materias']);
    }
  }
}