import { Cliente } from "../cliente";

export interface CuentaCorriente {
  cliente: Cliente;
  deuda: number;
}
