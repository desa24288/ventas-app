import { Producto } from 'src/app/models/producto';
export class Detalleventa {

  constructor(
    public venta_id?: string,
    public cantidad?: number,
    public subtotal?: string,
    public productos?: Array<Producto>,
    public rut_cliente?: string,

  ) {

  }


}
