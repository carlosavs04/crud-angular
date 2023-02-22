import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';

import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private tokenValid:boolean = false
  constructor(private authService:AuthService, private router: Router, private userService: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = localStorage.getItem('token')
      if(token){
        this.authService.verifyToken(token).subscribe(
        ()=>{
        this.tokenValid = true
        },
        ()=> { this.userService.logout().subscribe(), localStorage.removeItem('token'), this.router.navigate(['/login'])
        alert('Tu sesión ha expirado o tu token es inválido.');
        this.tokenValid = false
        })
      }
      return this.tokenValid
  }
}
