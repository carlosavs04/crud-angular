import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const roles = route.data['roles'] as Array<number>;
      
      return this.userService.getRol().pipe(
        map(response => {
          const rol = parseInt(response.rol || '', 10);
          if(roles.includes(rol)) {
            return true;
          }
          alert('No tienes permisos para acceder a esta ruta.')
          return false;
        })
      );
  }
}
