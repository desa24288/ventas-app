import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Detalleventa } from 'src/app/models/detalleventa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public listdetalle: Array<Detalleventa> = [];
  public flageliminar = false;

  constructor( public router: Router ) {

   }

  ngOnInit(): void {
    this.cargaventas();

  }


  cargaventas() {
    const detalle = JSON.parse(localStorage.getItem('detalleventas') || '{}' );
    this.listdetalle.push(detalle);

  }

  onDetalle(idventa: any) {
    this.flageliminar = true;
    localStorage.setItem('flageliminar', JSON.stringify(this.flageliminar));
    this.router.navigate(['ingresarventa']);

  }

}

