import { Component, Injectable, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Interfaces/user.interface';
import { UserService } from 'src/app/Services/user.service';
import { Rol } from 'src/app/Interfaces/rol.interface';
import { RolService } from 'src/app/Services/rol.service';

@Component({
  selector: 'app-rol-form',
  templateUrl: './rol-form.component.html',
  styleUrls: ['./rol-form.component.css']
})

@Injectable()
export class RolFormComponent {
  rolForm: FormGroup;
  user?: User;
  roles?: Rol[];
  
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {id: number}, private rolService: RolService, private userService: UserService, private fb: FormBuilder) { 
    this.rolForm = this.fb.group({
      rol: ['', Validators.required],
    });

    this.rolService.getRoles().subscribe(rol => {
      this.roles = rol;
    });
  }

  close() {
    this.dialog.closeAll()
  }

  onSubmit(user: User) {
    if(this.rolForm.valid) {
      this.userService.changeRol(user, this.data.id).subscribe(() => location.reload());
      this.close();
    }
  }
}
