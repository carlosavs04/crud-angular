import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Carrera } from '../Interfaces/carrera.interface';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private getCarrerasUrl = environment.apiUrl + '/carreras';
  private carreraUrl = environment.apiUrl + '/carrera';
  private deleteCarreraUrl = environment.apiUrl + '/delete/carrera';

  constructor(private http: HttpClient) { }

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(this.getCarrerasUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getCarrera(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(this.carreraUrl + '/' + id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addCarrera(carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(this.carreraUrl, carrera)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCarrera(carrera: Carrera, id: Number): Observable<Carrera> {
    return this.http.put<Carrera>(this.carreraUrl + '/' + id, carrera)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCarrera(id: number): Observable<Carrera> {
    return this.http.delete<Carrera>(this.deleteCarreraUrl + '/' + id)
      .pipe(
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
