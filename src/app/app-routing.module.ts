import { ErrorComponent } from './template/error/error.component';
import { IngresarclienteComponent } from './template/ingresarcliente/ingresarcliente.component';
import { IngresarproductoComponent } from './template/ingresarproducto/ingresarproducto.component';
import { IngresarventaComponent } from './template/ingresarventa/ingresarventa.component';
import { HomeComponent } from './template/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'ingresarcli', component: IngresarclienteComponent },
  { path: 'ingresarprod', component: IngresarproductoComponent },
  { path: 'ingresarventa', component: IngresarventaComponent },

  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
