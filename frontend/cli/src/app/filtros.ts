import { Articulo } from "./articulos/articulo";
import { Cliente } from "./clientes/cliente";

export interface Filtro {
  selectedDate: string;
  entregadoFilter: string;
  facturadoFilter: string;
  recepcionCompletado: string;
  cliente: Cliente;
  articulo: Articulo;
  currentPage: number;
}
