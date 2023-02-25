import { Component, ViewChild, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Dropdown } from 'flowbite';
import type { DropdownOptions, DropdownInterface } from 'flowbite';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  iAdmin: boolean = true;
  userLoggedIn: boolean = false;
  @ViewChild('verDropdown') verDropdown?: Dropdown;
  @ViewChild('añadirDropdown') añadirDropdown?: Dropdown;

  ngOnInit() {
    this.isAdmin();
    this.getToken();
    const iAdmin = localStorage.getItem('iAdmin');
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    if (iAdmin !== null) {
      this.iAdmin = iAdmin === 'true';
    }

    if (userLoggedIn !== null) {
      this.userLoggedIn = userLoggedIn === 'true';
    }

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
        } else {
          this.iAdmin = false;
        }
      })
    ).subscribe(response => {
      localStorage.setItem('iAdmin', this.iAdmin.toString());
      console.log(response);
    });
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

  showVerDropdown() {
    this.verDropdown?.show();
  }

  showAddDropdown() {
    this.añadirDropdown?.show();
  }
  
  ngAfterViewInit() {
    const dropdownButton: HTMLElement | null = document.getElementById('dropdownButton');
    const dropdownMenu: HTMLElement | null = document.getElementById('dropdownMenu');
    const targetEl: HTMLElement | null = document.getElementById('targetEl');
    const triggerEl: HTMLElement | null = document.getElementById('triggerEl');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');

    const options: DropdownOptions = {
      placement: 'bottom',
      triggerType: 'click',
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
      onHide: () => {
          console.log('dropdown has been hidden');
      },
      onShow: () => {
          console.log('dropdown has been shown');
      },
      onToggle: () => {
          console.log('dropdown has been toggled');
      }
    };
    const verDropdown: DropdownInterface = new Dropdown(dropdownMenu, dropdownButton, options);
    verDropdown.hide();

    const añadirDropdown: DropdownInterface = new Dropdown(targetEl, triggerEl, options);
    añadirDropdown.hide();

    dropdownLinks.forEach(link => {
      link.addEventListener('click', () => {
        verDropdown.hide();
        añadirDropdown.hide();
      });
    });
  }  
}

