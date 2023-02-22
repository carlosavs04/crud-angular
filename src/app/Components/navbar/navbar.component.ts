import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private userService: UserService, private router: Router) {}

  isLogged: boolean = false;
  iAdmin: boolean = false;
  userLoggedIn: boolean = false;

  ngOnInit() {
    this.isAdmin();
    this.getToken();
    this.userService.getUserLoggedIn().subscribe(loggedIn => {
      this.userLoggedIn = loggedIn;
    });
  }

  isAdmin() {
    this.userService.isAdmin().pipe(
      map(isAdmin => {
        if(isAdmin) {
          this.iAdmin = true;
        } else {
          this.iAdmin = false;
        }
      })
    ).subscribe(response => console.log(response));
  }

  getToken() {
    this.userService.getToken().pipe(
      map(token => { 
        if(token) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      })
    ).subscribe(response => console.log(response));
  }

  logout() {
    this.userService.logout().subscribe(() => location.reload());
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }
}

