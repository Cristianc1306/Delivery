import { Localidad } from "./localidad";

export interface Domicilio {
  id: number;

  calle: string;

  altura: string;

  pisoDpto: string;

  localidad: Localidad;
}
