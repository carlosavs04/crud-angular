import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarreraService } from 'src/app/Services/carrera.service';
import { Carrera } from 'src/app/Interfaces/carrera.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carreras-update',
  templateUrl: './carreras-update.component.html',
  styleUrls: ['./carreras-update.component.css']
})

@Injectable()
export class CarrerasUpdateComponent implements OnInit {
  carreraForm: FormGroup;
  carrera?: Carrera;
  id?: number;

  constructor(private fb: FormBuilder, private carreraService: CarreraService, private router: Router, private route: ActivatedRoute) {
    this.carreraForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.carreraService.getCarrera(this.id).subscribe(carrera => 
      this.carreraForm.patchValue(carrera))
  }

  onSubmit(values: Carrera) {
    if(this.carreraForm.valid) {
      this.carreraService.updateCarrera(values, Number(this.route.snapshot.paramMap.get('id'))).subscribe();
      this.router.navigate(['/carreras']);
    }
  }
}
