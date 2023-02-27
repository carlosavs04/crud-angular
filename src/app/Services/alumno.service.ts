import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Alumno } from '../Interfaces/alumno.interface';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private getAlumnosUrl = environment.apiUrl + '/alumnos';
  private alumnoUrl = environment.apiUrl + '/alumno';
  private deleteAlumnoUrl = environment.apiUrl + '/delete/alumno';

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.getAlumnosUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getAlumno(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.alumnoUrl + '/' + id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.alumnoUrl, alumno)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateAlumno(alumno: Alumno, id: Number): Observable<Alumno> {
    return this.http.put<Alumno>(this.alumnoUrl + '/' + id, alumno)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteAlumno(id: number): Observable<Alumno> {
    return this.http.delete<Alumno>(this.deleteAlumnoUrl + '/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  filterAlumnos(carrera: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.getAlumnosUrl + '/' + carrera)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
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
