import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from 'src/app/Interfaces/profesor.interface';
import { ProfesorService } from 'src/app/Services/profesor.service';

interface CheckboxState {
  [key: number]: boolean;
}

@Component({
  selector: 'app-profesor-delete-materia',
  templateUrl: './profesor-delete-materia.component.html',
  styleUrls: ['./profesor-delete-materia.component.css']
})

export class ProfesorDeleteMateriaComponent implements OnInit {

  profesor?: Profesor
  selectedIds: number[] = [];
  isChecked: CheckboxState = {};

  constructor(private profesorService: ProfesorService, private fb:FormBuilder,private activeRoute: ActivatedRoute, private router: Router) { 
    this.profesor?.materias?.forEach((materia) => {
      this.isChecked[materia.id] = false;
    })
  }

  ngOnInit(): void {
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'))
    this.profesorService.getProfesor(id).subscribe((profesor) => {
      this.profesor = profesor
    })
  }

  onSubmit(){
    const materias = { materia: this.selectedIds }
    this.profesorService.deleteRelacion(Number(this.activeRoute.snapshot.paramMap.get('id')), materias).subscribe(()=>{
      this.router.navigate(['/profesores'])
    })
  }


  updateSelectedIds() {
    this.selectedIds = [];
    Object.keys(this.isChecked).forEach(key => {
      if (this.isChecked[+key]) {
        this.selectedIds.push(+key);
      }
    })
    //console.log(this.selectedIds);
  }


  }



