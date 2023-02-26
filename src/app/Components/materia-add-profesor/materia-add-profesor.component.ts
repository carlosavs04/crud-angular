import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'src/app/Services/materia.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Materia } from 'src/app/Interfaces/materia.interface';
import { Profesor } from 'src/app/Interfaces/profesor.interface';
import { ProfesorService } from 'src/app/Services/profesor.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-materia-add-profesor',
  templateUrl: './materia-add-profesor.component.html',
  styleUrls: ['./materia-add-profesor.component.css']
})
export class MateriaAddProfesorComponent implements OnInit {

  id? : number
  profesores? : Profesor[]
  materia?: Materia
  materiaProfesorForm: FormGroup

 constructor(private profesorService: ProfesorService, private router: Router,
  private activeRoute:ActivatedRoute, private materiaService: MateriaService,
  private fb: FormBuilder) {
    this.materiaProfesorForm = this.fb.group({
      profesor_id: ['']
    })
 }

  ngOnInit(): void {
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'))
    this.materiaService.getMateria(this.id).subscribe((materia)=>{
      this.materia = materia
    })
    this.profesorService.getProfesores().subscribe((profesores)=>{
      this.profesores = profesores
    })
  }

  onSubmit(value:number) :void{
    console.log(value)
  }

}
