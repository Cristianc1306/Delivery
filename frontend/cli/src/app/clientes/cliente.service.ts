import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Cliente } from "./cliente";
import { DataPackage } from "../data.package";
import { Filtro } from "../filtros";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private clientesUrl = "rest/clientes"; // URL to web api

  private filtro = <Filtro>{};

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.clientesUrl); // REST
  }

  save(cliente: Cliente): Observable<DataPackage> {
    return this.http[cliente.id ? "put" : "post"]<DataPackage>(
      this.clientesUrl,
      cliente
    );
  }
  delete(id: string, fecha: string): Observable<DataPackage> {
    return this.http.delete<DataPackage>(
      `${this.clientesUrl}/${id}?fecha=${fecha}`
    );
  }

  get(id: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.clientesUrl}/${id}`);
  }
  getFiltro(): Filtro {
    return this.filtro;
  }
  setFiltro(filtro: Filtro) {
    this.filtro = filtro;
  }

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.clientesUrl}/search/${text}`);
  }
  searchClientesActivos(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.clientesUrl}/search/activos/${text}`
    );
  }
  searchClientes(
    filtro: Filtro,
    page: number,
    cant: number
  ): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.clientesUrl}/search?term=${filtro.cliente.name}&fecha=${filtro.selectedDate}&cuit=${filtro.cliente.cuit}&page=${page}&cant=${cant}`
    );
  }

  getDeudaClientes(page: number, cant: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.clientesUrl}/cuentacorriente?page=${page}&cant=${cant}`
    );
  }
}
