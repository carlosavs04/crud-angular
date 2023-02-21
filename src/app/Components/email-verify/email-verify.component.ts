import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent {

  constructor(private router:Router) { }

  goToVerify(){
    this.router.navigate(['/codeverify']);
  }

}
