import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Materia } from '../Interfaces/materia.interface';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private getMateriasUrl = environment.apiUrl + '/materias';
  private materiaUrl = environment.apiUrl + '/materia';
  private deleteMateriaUrl = environment.apiUrl + '/delete/materia';
  private addProfesorUrl = environment.apiUrl + '/materia/add/profesor/';


  constructor(private http: HttpClient) { }

  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.getMateriasUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getMateria(id: number): Observable<Materia> {
    return this.http.get<Materia>(this.materiaUrl + '/' + id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addMateria(materia: Materia): Observable<Materia> {
    return this.http.post<Materia>(this.materiaUrl, materia)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateMateria(materia: Materia, id: Number): Observable<Materia> {
    return this.http.put<Materia>(this.materiaUrl + '/' + id, materia)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteMateria(id: number): Observable<Materia> {
    return this.http.delete<Materia>(this.deleteMateriaUrl + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  addProfesor(id:number, profesorId:number){
    return this.http.post((this.addProfesorUrl + id), profesorId).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('Un error inesperado ha ocurrido:', error.error);
    } else {
      alert('Error: ' + error.error.mensaje +'.');
      console.error(
        `Error en el servidor: ${error.status}, \nRespuesta:`, error.error
      )
    }

    return throwError(() => new Error('Algo malo ha ocurrido; por favor, inténtelo de nuevo más tarde.'));
  }
}
