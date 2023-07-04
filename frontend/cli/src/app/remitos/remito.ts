import { ArticulosPedido } from "../articulospedido/articulospedido";
import { Domicilio } from "../domicilios/domicilio";

export interface Remito {
  id: number;

  fechaArmado: Date;

  entregado: boolean;

  domicilio: Domicilio;

  total: number;

  articulosPedido: ArticulosPedido[];
}
