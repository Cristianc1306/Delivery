import { Cliente } from "../clientes/cliente";

export interface Venta {
  total: number;

  cliente: Cliente;
}
