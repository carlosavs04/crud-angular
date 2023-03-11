import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Animal } from '../Interfaces/animal.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private getAnimalesUrl = environment.newApiUrl + '/animales';
  private animalUrl = environment.newApiUrl + '/animal';

  constructor(private Http: HttpClient) { }

  getAnimales(): Observable<Animal[]> {
    return this.Http.get<Animal[]>(this.getAnimalesUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  addAnimal(animal: Animal): Observable<Animal> {
    return this.Http.post<Animal>(this.animalUrl, animal)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('Un error inesperado ha ocurrido:', error.error);
    } else {
      alert('Error: ' + error.error.error);
      console.error(
        `Error en el servidor: ${error.status}, \nRespuesta:`, error.error
      )
    }

    return throwError(() => new Error('Algo malo ha ocurrido; por favor, inténtelo de nuevo más tarde.'));
  }
}
