import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { User } from '../Interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registerUrl = environment.apiUrl + '/register';
  private loginUrl = environment.apiUrl + '/login';
  private getUsersUrl = environment.apiUrl + '/users';
  private changeStatusUrl = environment.apiUrl + '/usuario/active';
  private changeRolUrl = environment.apiUrl + '/rol/usuario';
  private getRolUrl = environment.apiUrl + '/user/role';
  private getUserUrl = environment.apiUrl + '/user';
  private isAdminUrl = environment.apiUrl + '/user/admin';
  private logoutUrl = environment.apiUrl + '/logout';

  private userLoggedIn = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  private signedRoute: string = '';

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  setSignedRoute(route: string) {
    this.signedRoute = route;
  }

  getSignedRoute() :string {
    return this.signedRoute;
  }

  verifyCode(code: string) {
    const route = this.getSignedRoute();
    return this.http.post(route, code)
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, user)
      .pipe(
        tap(() => {
          this.userLoggedIn.next(true);
        }),
        catchError(this.handleError)
      );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.getUsersUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.getUsersUrl + '/' + id)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  changeStatus(id: number) {
    const user = this.http.get<User>(this.getUsersUrl + '/' + id);
    return this.http.put(this.changeStatusUrl + '/' + id, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  changeRol(user: User, id: number) {
    return this.http.put(this.changeRolUrl + '/' + id, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  getRol() {
    return this.http.get<User>(this.getRolUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  isAdmin() {
    return this.http.get<User>(this.isAdminUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getToken() {
    return this.http.get<User>(this.getUserUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  logout(): Observable<User> {
    return this.http.get<User>(this.logoutUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getUserLoggedIn() {
    return this.userLoggedIn.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.error('Un error inesperado ha ocurrido:', error.error);
    } else if (error.status === 400) {
      alert('Error: ' + error.error.message +'.');
      console.error(
        `Error en el servidor: ${error.status}, \nRespuesta:`, error.error
      )
    }

    return throwError(() => new Error('Algo malo ha ocurrido; por favor, inténtelo de nuevo más tarde.'));
  }
}
