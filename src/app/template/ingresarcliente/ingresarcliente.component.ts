import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-ingresarcliente',
  templateUrl: './ingresarcliente.component.html',
  styleUrls: ['./ingresarcliente.component.css']
})
export class IngresarclienteComponent implements OnInit {
  public forma!: FormGroup;
  public modcliente: Cliente = new Cliente();
  public arcliente: Array<Cliente> = [];

  constructor( private formb: FormBuilder) {

    this.crearFormulario();
    this.llenarFormulario();

   }

  ngOnInit(): void {
  }

  crearFormulario() {

    this.forma = this.formb.group( {
      rut_cliente: ['', [ Validators.required, Validators.minLength(9) ]],
      nombre: ['', [ Validators.required, Validators.minLength(3) ]],
      apellido: ['', [ Validators.required, Validators.minLength(3) ]],
      correo: ['',  [ Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]],
      direccion: ['', [ Validators.required, Validators.minLength(3) ]],
      estado: ['', [ Validators.required ]]
    } );

  }

  llenarFormulario() {
    this.forma.reset({
        rut_cliente: '11111111-1',
        nombre: 'Simon',
        apellido: 'Belmont',
        correo: 'simonb@castlecorp.com',
        direccion: 'las cruces 996, transilvania'
      });

  }

  get rutNoValido() {
    return this.forma.controls.rut_cliente.invalid &&
      this.forma.controls.rut_cliente.touched;

  }
  get nombreNoValido() {
    return this.forma.controls.nombre.invalid &&
      this.forma.controls.nombre.touched;

  }

  get apellidoNoValido() {
    return this.forma.controls.apellido.invalid &&
      this.forma.controls.apellido.touched;

  }

  get correoNoValido() {
    return this.forma.controls.correo.invalid &&
      this.forma.controls.correo.touched;

  }

  get direccionNoValido() {
    return this.forma.controls.direccion.invalid &&
    this.forma.controls.direccion.touched;

  }

  get estadoNoValido() {
    return this.forma.controls.estado.invalid &&
    this.forma.controls.estado.touched;

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

    this.modcliente = this.forma.value;

    if (localStorage.getItem('clientes') !== null) {
      const lastcli: Cliente = JSON.parse(localStorage.getItem('clientes') || '{}');

      if( lastcli.rut_cliente === this.modcliente.rut_cliente ) {
        alert("Cliente ya existe");
        return;

      }

      this.success();


    }else {
      this.success();

    }

  }

  success() {
    alert("Cliente guardado con éxito!");
    localStorage.setItem('clientes', JSON.stringify(this.modcliente));
    this.forma.reset();

  }

}

