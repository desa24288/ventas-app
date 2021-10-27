import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-ingresarproducto',
  templateUrl: './ingresarproducto.component.html',
  styleUrls: ['./ingresarproducto.component.css']
})
export class IngresarproductoComponent implements OnInit {
  public forma!: FormGroup;
  public modproducto: Producto = new Producto();
  public alert = false;

  constructor( private formb: FormBuilder ) {

    this.crearFormulario();
    this.llenarFormulario();

   }

  ngOnInit(): void {
  }

  crearFormulario() {

    this.forma = this.formb.group( {
      producto_id: ['', []],
      nombre: ['', [ Validators.required, Validators.minLength(3) ]],
      precio: [0, [ Validators.required, Validators.min(0),
        , Validators.max(999999) ]],
      stock: [0, [ Validators.required, Validators.min(0),
        , Validators.max(999999) ]],
      cantidad: ['', []],

    } );

  }

  llenarFormulario() {
    this.forma.reset({
        nombre: 'holywater',
        precio: 5,
        stock: 10,
        cantidad: 0,
      });

  }

  get nombreNoValido() {
    return this.forma.controls.nombre.invalid &&
      this.forma.controls.nombre.touched;

  }

  get precioNoValido() {
    return this.forma.controls.precio.invalid &&
      this.forma.controls.precio.touched;

  }

  get stockNoValido() {
    return this.forma.controls.stock.invalid &&
      this.forma.controls.stock.touched;

  }

  guardar() {

    if( this.forma.invalid ) {
      Object.values( this.forma.controls ).forEach( control => {

        if( control instanceof FormGroup) {
          Object.values( control.controls ).forEach( control => {
            control.markAllAsTouched();

          });

        } else {
          control.markAsTouched();
          return;
        }

      });


    }

    this.forma.controls.producto_id.setValue((Math.random()*0xFFFFFF<<0).toString(16));
    this.modproducto = this.forma.value;
    this.success();

  }

  success() {
    alert("Producto guardado con éxito!");
    localStorage.setItem('productos', JSON.stringify(this.modproducto));
    this.forma.reset();

  }

}


