import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Rol } from '../Interfaces/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private getRolesUrl = environment.apiUrl + '/roles';
  constructor(private http: HttpClient) { }

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.getRolesUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('Un error inesperado ha ocurrido:', error.error);
    } else {
      alert('Error: ' + error.error.message +'.');
      console.error(
        `Error en el servidor: ${error.status}, \nRespuesta:`, error.error
      )
    }

    return throwError(() => new Error('Algo malo ha ocurrido; por favor, inténtelo de nuevo más tarde.'));
  }
}
