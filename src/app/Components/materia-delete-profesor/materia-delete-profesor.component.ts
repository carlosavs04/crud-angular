import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Materia } from 'src/app/Interfaces/materia.interface';
import { MateriaService } from 'src/app/Services/materia.service';

interface CheckboxState {
  [key: number]: boolean;
}

@Component({
  selector: 'app-materia-delete-profesor',
  templateUrl: './materia-delete-profesor.component.html',
  styleUrls: ['./materia-delete-profesor.component.css']
})
export class MateriaDeleteProfesorComponent implements OnInit {

  materia?: Materia
  selectedIds: number[] = [];
  isChecked: CheckboxState = {};

  constructor(private materiaService: MateriaService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.activeRoute.snapshot.paramMap.get('id'))
    this.materiaService.getMateria(id).subscribe((materia) => {
      this.materia = materia
    })
  }

  onSubmit(){
    const profesor = { profesor: this.selectedIds }
    //console.log(profesor)
    this.materiaService.deleteRelacion(Number(this.activeRoute.snapshot.paramMap.get('id')), profesor).subscribe(()=>{
      this.router.navigate(['/materias'])
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


