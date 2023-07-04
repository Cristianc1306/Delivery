import { ArticulosPedido } from "../articulospedido/articulospedido";
import { Cliente } from "../clientes/cliente";

export interface Factura {
  id: number;

  fechaEmision: Date;

  fechaPago: Date;

  cliente: Cliente;

  total: number;

  articulosPedido: ArticulosPedido[];
}
