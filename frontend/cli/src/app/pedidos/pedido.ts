import { ArticulosPedido } from "../articulospedido/articulospedido";
import { Cliente } from "../clientes/cliente";
import { Domicilio } from "../domicilios/domicilio";

export interface Pedido {
  id: number;

  fecha: Date;

  observaciones: string;

  domicilio: Domicilio;

  cliente: Cliente;

  total: number;

  completado: boolean;

  articulosPedido: ArticulosPedido[];
}
