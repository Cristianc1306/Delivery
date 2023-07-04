import { Articulo } from "../articulos/articulo";
import { Factura } from "../facturas/factura";
import { Pedido } from "../pedidos/pedido";
import { Remito } from "../remitos/remito";

export interface ArticulosPedido {
  id: number;

  cantidad: number;

  precio: number;

  pedido: Pedido;

  articulo: Articulo;

  remito: Remito;

  factura: Factura;
}
