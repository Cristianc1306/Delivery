import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { DataPackage } from "../data.package";
import { Filtro } from "../filtros";
import { Pedido } from "./pedido";

@Injectable({
  providedIn: "root",
})
export class PedidoService {
  private pedidosUrl = "rest/pedidos"; // URL to web api

  private filtro = <Filtro>{};

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.pedidosUrl); // REST
  }

  create(pedido: Pedido): Observable<DataPackage> {
    return this.http.post<DataPackage>(`${this.pedidosUrl}`, pedido);
  }

  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.pedidosUrl}/${id}`);
  }

  getFiltro(): Filtro {
    return this.filtro;
  }
  setFiltro(filtro: Filtro) {
    this.filtro = filtro;
  }
  search(filtro: Filtro, page: number, cant: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.pedidosUrl}/search?term=${filtro.cliente.name}&fecha=${filtro.selectedDate}&estado=${filtro.recepcionCompletado}&cuit=${filtro.cliente.cuit}&page=${page}&cant=${cant}`
    );
  }
}
