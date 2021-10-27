import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './template/menu/menu.component';
import { IngresarproductoComponent } from './template/ingresarproducto/ingresarproducto.component';
import { IngresarclienteComponent } from './template/ingresarcliente/ingresarcliente.component';
import { IngresarventaComponent } from './template/ingresarventa/ingresarventa.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './template/error/error.component';
import { HomeComponent } from './template/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IngresarproductoComponent,
    IngresarclienteComponent,
    IngresarventaComponent,
    ErrorComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
