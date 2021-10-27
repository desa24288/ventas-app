import { Venta } from './../../models/venta';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente';
import { Producto } from 'src/app/models/producto';
import { Detalleventa } from 'src/app/models/detalleventa';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresarventa',
  templateUrl: './ingresarventa.component.html',
  styleUrls: ['./ingresarventa.component.css']
})
export class IngresarventaComponent implements OnInit {
  public forma!: FormGroup;
  public listaproductos: Array<Producto> = [];
  public arproductos: Array<Producto> = [];
  public arclientes: Array<Cliente> = [];
  public modventa: Venta = new Venta();
  public detventa: Array<Detalleventa> = [];
  public cantprod = 0;
  public flageliminar = false;

  constructor( private formb: FormBuilder,
    public router: Router ) {

    this.crearFormulario();
    this.llenarFormulario();

   }

  ngOnInit(): void {
    const flag = JSON.parse(localStorage.getItem('flageliminar') || '{}' );
    this.flageliminar = flag;
    this.comboCliente();
    this.comboProductos();

    if(this.flageliminar) {
      this.cargaVenta();

    }
  }

  crearFormulario() {

    this.forma = this.formb.group( {
      venta_id: ['', []],
      fecha: [ '', [ Validators.required ]],
      iva: ['',  [ Validators.required, Validators.min(0),
        , Validators.max(999999) ]],
      descuento: ['',  [ Validators.required, Validators.min(0),
        , Validators.max(999999) ]],
      total: ['', [ Validators.required, Validators.min(0),
        , Validators.max(999999) ]],
      rut_cliente: ['', [ Validators.required ]],
      id_producto: ['', []],
      productos: ['', []],

    } );

  }

  llenarFormulario() {
    this.forma.reset({
      fecha: '',
      iva: 0,
      descuento: 0,
      total: 0,
      rut_cliente: ''
    });

  }

  get fechaNoValido() {
    return this.forma.controls.fecha.invalid &&
      this.forma.controls.fecha.touched;

  }

  get ivaNoValido() {
    return this.forma.controls.iva.invalid &&
      this.forma.controls.iva.touched;

  }

  get descuentoNoValido() {
    return this.forma.controls.descuento.invalid &&
      this.forma.controls.descuento.touched;

  }

  get rutNoValido() {
    return this.forma.controls.rut_cliente.invalid &&
    this.forma.controls.rut_cliente.touched;

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
    this.forma.controls.venta_id.setValue((Math.random()*0xFFFF<<0).toString(5));

    this.calculoFinal();
    this.modventa = this.forma.value;
    this.success();

  }

  success() {
    alert("Venta guardada con éxito!");

    localStorage.setItem('ventas', JSON.stringify(this.modventa));
    this.forma.reset();
    this.arproductos = [];

  }

  comboCliente() {
    const cli = JSON.parse(localStorage.getItem('clientes') || '{}' );
    /** verifica si cliente esta desactivado */
    if( cli.estado === 'desactivado') {
      return;

    } else {
      this.arclientes.push(cli);

    }

  }

  comboProductos() {
    const prod = JSON.parse(localStorage.getItem('productos') || '{}' );
    let arprod: Array<Producto> = [];
    arprod.push(prod);

    for( let prod of arprod ){
      if( prod.stock === 0 ) {
        return;

      } else {
        this.listaproductos.push(prod);

      }
    }

  }

  limpiar() {
    this.forma.reset();
    this.arproductos = [];

  }

  agregarProducto() {

    const idprod = this.forma.controls.id_producto.value;
    /** array de productos */
    const prod = JSON.parse(localStorage.getItem('productos') || '{}' );

    let arprod: Array<Producto> = [];
    arprod.push(prod);

    for( let prod of arprod ){
      if( prod.producto_id === idprod ) {
        this.arproductos.push(prod);

      }
    }

  }

  onCantidad(id: number, producto: Producto) {

    let total = (producto.cantidad! * producto.precio!);
    this.forma.controls.total.setValue( total );

  }

  calculoFinal() {
    const iva = this.forma.controls.iva.value;
    const desc = this.forma.controls.descuento.value;
    let totalprev =  this.forma.controls.total.value;

    let totaldesc = totalprev - desc;

    const totaliva = totaldesc + totaldesc * (iva / 100);

    this.forma.controls.total.setValue( Math.round(totaliva));

    let arprod: Array<Producto> = [];
    for(let prod of this.arproductos) {
      if( prod.cantidad! > 0 ) {
        arprod.push(prod);
        this.cantprod = prod.cantidad!;
      }

    }

    this.forma.controls.productos.setValue(arprod);

    let detventa = new Detalleventa();
    detventa.cantidad = this.cantprod;
    detventa.productos = arprod;
    detventa.rut_cliente = this.forma.controls.rut_cliente.value;
    detventa.subtotal = Math.round(totaliva).toString();
    detventa.venta_id = this.forma.controls.venta_id.value;

    localStorage.setItem('detalleventas', JSON.stringify(detventa));

  }

  cargaVenta() {
    const detalle = JSON.parse(localStorage.getItem('detalleventas') || '{}' );
    const venta = JSON.parse(localStorage.getItem('ventas') || '{}' );

    if( (detalle !== null && detalle !== undefined) &&
      (venta !== null && venta !== undefined) ) {

        if( detalle.venta_id === venta.venta_id ) {

          this.forma.reset({
            fecha: venta.fecha,
            iva: venta.iva,
            descuento: venta.descuento,
            total: venta.total,
            rut_cliente: venta.rut_cliente
          });
          this.arproductos = venta.productos;
        }

      }

  }

  eliminar() {
    localStorage.removeItem('ventas');
    localStorage.removeItem('detalleventas');
    this.limpiar();

  }


}


