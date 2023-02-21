import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Profesor } from '../Interfaces/profesor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private getProfesoresUrl = environment.apiUrl + '/profesores';
  private profesorUrl = environment.apiUrl + '/profesor';
  private deleteProfesorUrl = environment.apiUrl + '/delete/profesor';

  constructor(private http: HttpClient) { }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.getProfesoresUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getProfesor(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(this.profesorUrl + '/' + id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.profesorUrl, profesor)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateProfesor(profesor: Profesor, id: Number): Observable<Profesor> {
    return this.http.put<Profesor>(this.profesorUrl + '/' + id, profesor)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteProfesor(id: number): Observable<Profesor> {
    return this.http.delete<Profesor>(this.deleteProfesorUrl + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('Un error inesperado ha ocurrido:', error.error);
    } else {
      console.error(
        `Error en el servidor: ${error.status}, \nRespuesta:`, error.error
      )
    }

    return throwError(() => new Error('Algo malo ha ocurrido; por favor, inténtelo de nuevo más tarde.'));
  }
}
