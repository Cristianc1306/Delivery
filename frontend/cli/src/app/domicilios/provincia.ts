import { Pais } from "./pais";

export interface Provincia {
  id: number;

  nombre: string;

  pais: Pais;
}
