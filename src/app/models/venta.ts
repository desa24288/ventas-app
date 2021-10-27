import { Producto } from 'src/app/models/producto';
export class Venta {

  constructor(
    public venta_id?: string,
    public fecha?: Date,
    public iva?: number,
    public descuento?: number,
    public total?: string,
    public productos?: Array<Producto>,
    public rut_cliente?: string,

  ) {

  }


}
