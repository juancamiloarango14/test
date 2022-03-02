import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEstudianteComponent } from './components/create-estudiante/create-estudiante.component';
import { ListEstudiantesComponent } from './components/list-estudiantes/list-estudiantes.component';


const routes: Routes = [
  {path: '', redirectTo:'list-estudiantes', pathMatch: 'full'},
  {path:'list-estudiantes', component:ListEstudiantesComponent},
  {path:'create-estudiante', component:CreateEstudianteComponent},
  {path:'edit-estudiante/:id', component:CreateEstudianteComponent},
  {path: '**', redirectTo:'list-estudiantes', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
