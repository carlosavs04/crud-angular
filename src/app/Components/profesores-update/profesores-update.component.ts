import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfesorService } from 'src/app/Services/profesor.service';
import { Profesor } from 'src/app/Interfaces/profesor.interface';
import { Router, ActivatedRoute } from '@angular/router';

interface CheckboxState {
  [key: number]: boolean;
}

@Component({
  selector: 'app-profesores-update',
  templateUrl: './profesores-update.component.html',
  styleUrls: ['./profesores-update.component.css']
})


@Injectable()
export class ProfesoresUpdateComponent implements OnInit {

  profesorForm: FormGroup;
  profesor?: Profesor;
  id?: number;


  constructor(private fb: FormBuilder, private profesorService: ProfesorService, private router: Router, private route: ActivatedRoute) {


    this.profesorForm = this.fb.group({
      nombre: ['', Validators.required],
      ap_paterno: ['', Validators.required],
      ap_materno: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.profesorService.getProfesor(this.id).subscribe((profesor) =>{
      this.profesor = profesor;
      this.profesorForm.patchValue(profesor);
    })
  }


  onSubmit(values: Profesor) {
    if(this.profesorForm.valid) {
      this.profesorService.updateProfesor(values, Number(this.route.snapshot.paramMap.get('id'))).subscribe();
      this.router.navigate(['/profesores']);
    }
  }



}
