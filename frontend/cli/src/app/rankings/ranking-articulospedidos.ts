import { Articulo } from "../articulos/articulo";

export interface RankingArticulo {
  total: number;

  cantidadPedida: number;

  articulo: Articulo;
}
