import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-verify',
  templateUrl: './code-verify.component.html',
  styleUrls: ['./code-verify.component.css']
})
export class CodeVerifyComponent {

  codeForm:FormGroup;

  constructor(private userService:UserService,private fb:FormBuilder,private router:Router) {
    this.codeForm = this.fb.group({
      codigo: ['', Validators.required],
    });
   }

  onSubmit(values: any) {
    if(this.codeForm.valid) {
      this.userService.verifyCode(values).subscribe((response:any)=>{
        if (response.status == 200) {
          this.router.navigate(['/login']);
          localStorage.removeItem('signedRoute');
        }
      });
    }
  }


}
