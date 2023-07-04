import { Domicilio } from "../domicilios/domicilio";
export interface Cliente {
  id: number;

  name: string;

  cuit: string;

  fechaDeBaja: Date;

  domicilios: Domicilio[];
}
