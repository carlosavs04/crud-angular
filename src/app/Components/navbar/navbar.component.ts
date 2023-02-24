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

  iAdmin: boolean = false;
  userLoggedIn: boolean = false;

  ngOnInit() {
    const iAdmin = localStorage.getItem('iAdmin');
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    if (iAdmin !== null) {
      this.iAdmin = iAdmin === 'true';
    }

    if (userLoggedIn !== null) {
      this.userLoggedIn = userLoggedIn === 'true';
    }

    this.isAdmin();
    this.getToken();
    this.userService.getUserLoggedIn().subscribe(loggedIn => {
      this.userLoggedIn = loggedIn;
      localStorage.setItem('userLoggedIn', this.userLoggedIn.toString());
    });
  }

  isAdmin() {
    this.userService.isAdmin().pipe(
      map(isAdmin => {
        if(isAdmin) {
          this.iAdmin = true;
          localStorage.setItem('iAdmin', this.iAdmin.toString());
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
          this.userLoggedIn = true;
          localStorage.setItem('userLoggedIn', this.userLoggedIn.toString());
        } else {
          this.userLoggedIn = false;
        }
      }
    )).subscribe(response => console.log(response));
  }
    
  logout() {
    this.userService.logout().subscribe(() => location.reload());
    localStorage.removeItem('token');
    localStorage.removeItem('iAdmin');
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }
}

