import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AlumnosTableComponent } from './Components/alumnos-table/alumnos-table.component';
import { ProfesoresTableComponent } from './Components/profesores-table/profesores-table.component';
import { CarrerasTableComponent } from './Components/carreras-table/carreras-table.component';
import { MateriasTableComponent } from './Components/materias-table/materias-table.component';
import { MateriasCreateComponent } from './Components/materias-create/materias-create.component';
import { AlumnosCreateComponent } from './Components/alumnos-create/alumnos-create.component';
import { ProfesoresCreateComponent } from './Components/profesores-create/profesores-create.component';
import { CarrerasCreateComponent } from './Components/carreras-create/carreras-create.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AlumnosUpdateComponent } from './Components/alumnos-update/alumnos-update.component';
import { TokenInterceptorInterceptor } from './Interceptors/token-interceptor.interceptor';
import { CodeVerifyComponent } from './Components/code-verify/code-verify.component';
import { EmailVerifyComponent } from './Components/email-verify/email-verify.component';
import { ProfesoresUpdateComponent } from './Components/profesores-update/profesores-update.component';
import { CarrerasUpdateComponent } from './Components/carreras-update/carreras-update.component';
import { MateriasUpdateComponent } from './Components/materias-update/materias-update.component';
import { UsersTableComponent } from './Components/users-table/users-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RolFormComponent } from './Components/rol-form/rol-form.component';
import { DeleteModalComponent } from './Components/delete-modal/delete-modal.component';
import { DeleteCarreraModalComponent } from './Components/delete-carrera-modal/delete-carrera-modal.component';
import { DeleteProfesorModalComponent } from './Components/delete-profesor-modal/delete-profesor-modal.component';
import { DeleteMateriaModalComponent } from './Components/delete-materia-modal/delete-materia-modal.component';
import { FilterAlumnosComponent } from './Components/filter-alumnos/filter-alumnos.component';
import { AddAlumnoModalComponent } from './Components/add-alumno-modal/add-alumno-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    AlumnosTableComponent,
    ProfesoresTableComponent,
    CarrerasTableComponent,
    MateriasTableComponent,
    MateriasCreateComponent,
    AlumnosCreateComponent,
    ProfesoresCreateComponent,
    CarrerasCreateComponent,
    NavbarComponent,
    AlumnosUpdateComponent,
    CodeVerifyComponent,
    EmailVerifyComponent,
    ProfesoresUpdateComponent,
    CarrerasUpdateComponent,
    MateriasUpdateComponent,
    UsersTableComponent,
    RolFormComponent,
    DeleteModalComponent,
    DeleteCarreraModalComponent,
    DeleteProfesorModalComponent,
    DeleteMateriaModalComponent,
    FilterAlumnosComponent,
    AddAlumnoModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
