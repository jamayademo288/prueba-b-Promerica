import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponent } from './layout/tabla/tabla.component';

const routes: Routes = [
  { path: '', redirectTo: 'busqueda-usuario', pathMatch: 'full' }, //Se crea una ruta por defecto
  {
    path: 'busqueda-usuario', //ruta para la busqueda de usuarios
    component: TablaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
