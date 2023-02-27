import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent {
  loginForm: FormGroup;
  user?: User;
  credencialesCorrectas:Boolean = false

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  onSubmit(values: User) {
    if(this.loginForm.valid) {
      this.userService.login(values).subscribe((response:any)=>{
        localStorage.setItem('token', response.token);
        if(response.status === 200){
          if(this.userService.getUserLoggedIn()){
            this.router.navigate(['/alumnos']);
          }
        }
        else if(response.status === 401){
          this.credencialesCorrectas = true
        }
      });
    }
  }
}
