import { Component,OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/Services/profesor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Profesor } from 'src/app/Interfaces/profesor.interface';
import { MateriaService } from 'src/app/Services/materia.service';
import { Materia } from 'src/app/Interfaces/materia.interface';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-profesor-add-materia',
  templateUrl: './profesor-add-materia.component.html',
  styleUrls: ['./profesor-add-materia.component.css']
})
export class ProfesorAddMateriaComponent implements OnInit {
  id? : number
  profesor? : Profesor
  materias?: Materia[]
  profesorMateriaForm: FormGroup

 constructor(private profesorService: ProfesorService, private router: Router,
  private activeRoute:ActivatedRoute, private materiaService: MateriaService,
  private fb: FormBuilder) {
    this.profesorMateriaForm = this.fb.group({
      materia_id: ['']
    })
 }

 ngOnInit(): void {
  this.id = Number(this.activeRoute.snapshot.paramMap.get('id'))
   this.profesorService.getProfesor(this.id).subscribe((profesor)=>{
    this.profesor = profesor
   })
   this.materiaService.getMaterias().subscribe((materias)=>{
    this.materias = materias
   })
 }

 onSubmit(value:number) :void{
  //console.log(value)
  this.profesorService.addMateria( Number(this.activeRoute.snapshot.paramMap.get('id')) , value).subscribe()
 }
}
