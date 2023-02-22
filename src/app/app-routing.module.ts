import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeVerifyComponent } from './Components/code-verify/code-verify.component';
import { EmailVerifyComponent } from './Components/email-verify/email-verify.component';
import { UsersTableComponent } from './Components/users-table/users-table.component';
import { CarrerasUpdateComponent } from './Components/carreras-update/carreras-update.component';
import { MateriasUpdateComponent } from './Components/materias-update/materias-update.component';
import { ProfesoresUpdateComponent } from './Components/profesores-update/profesores-update.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AlumnosTableComponent } from './Components/alumnos-table/alumnos-table.component';
import { CarrerasTableComponent } from './Components/carreras-table/carreras-table.component';
import { MateriasTableComponent } from './Components/materias-table/materias-table.component';
import { ProfesoresTableComponent } from './Components/profesores-table/profesores-table.component';
import { AlumnosCreateComponent } from './Components/alumnos-create/alumnos-create.component';
import { CarrerasCreateComponent } from './Components/carreras-create/carreras-create.component';
import { MateriasCreateComponent } from './Components/materias-create/materias-create.component';
import { ProfesoresCreateComponent } from './Components/profesores-create/profesores-create.component';
import { AlumnosUpdateComponent } from './Components/alumnos-update/alumnos-update.component';
import { FilterAlumnosComponent } from './Components/filter-alumnos/filter-alumnos.component';
import { AdminGuard } from './Guards/admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { LoginGuard } from './Guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, title: 'Iniciar sesión', canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, title: 'Registro', canActivate: [LoginGuard] },
  { path: 'emailverify', component: EmailVerifyComponent,title:'Verificacion de email', canActivate: [LoginGuard] },
  { path:'codeverify', component:CodeVerifyComponent,title:'Verificacion SMS', canActivate: [LoginGuard] },
  { path: 'alumnos/filter', component: FilterAlumnosComponent, title: 'Lista de alumnos', canActivate: [AuthGuard, AdminGuard], data: { roles: [1, 2, 3] } },
  { path: 'alumnos', component: AlumnosTableComponent, title: 'Lista de alumnos', canActivate: [AuthGuard, AdminGuard], data: { roles: [1, 2, 3] } },
  { path: 'carreras', component: CarrerasTableComponent, title: 'Lista de carreras', canActivate: [AuthGuard, AdminGuard], data: { roles: [1, 2, 3] }},
  { path: 'materias', component: MateriasTableComponent, title: 'Lista de materias',  canActivate: [AuthGuard, AdminGuard], data: { roles: [1, 2, 3] }},
  { path: 'profesores', component: ProfesoresTableComponent, title: 'Lista de profesores', canActivate: [AuthGuard, AdminGuard], data: { roles: [1, 2, 3] }},
  { path: 'users', component: UsersTableComponent, title: 'Lista de usuarios',  canActivate: [AuthGuard, AdminGuard], data: { roles: [1, 2, 3] }},
  { path: 'alumnos/create', component: AlumnosCreateComponent, title: 'Añadir alumno', canActivate: [AuthGuard, AdminGuard], data: { roles: [1, 3] }},
  { path: 'carreras/create', component: CarrerasCreateComponent, title: 'Añadir carrera',  canActivate: [AuthGuard, AdminGuard], data: { roles: [1] } },
  { path: 'materias/create', component: MateriasCreateComponent, title: 'Añadir materia',  canActivate: [AuthGuard, AdminGuard], data: { roles: [1] }},
  { path: 'profesores/create', component: ProfesoresCreateComponent, title: 'Añadir profesor',  canActivate: [AuthGuard, AdminGuard], data: { roles: [1] }},
  { path: 'alumnos/update/:id', component: AlumnosUpdateComponent, title: 'Actualizar alumno', canActivate: [AuthGuard, AdminGuard], data: { roles: [1] }  },
  { path: 'carreras/update/:id', component: CarrerasUpdateComponent, title: 'Actualizar carrera', canActivate: [AuthGuard, AdminGuard], data: { roles: [1] } },
  { path: 'materias/update/:id', component: MateriasUpdateComponent, title: 'Actualizar materia', canActivate: [AuthGuard, AdminGuard], data: { roles: [1] } },
  { path: 'profesores/update/:id', component: ProfesoresUpdateComponent, title: 'Actualizar profesor', canActivate: [AuthGuard, AdminGuard], data: { roles: [1] } },


  { path: '**', component: NotFoundComponent, title: 'Página no encontrada' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
