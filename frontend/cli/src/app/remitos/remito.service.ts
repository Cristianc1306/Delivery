import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data.package";
import { Remito } from "./remito";
import { Filtro } from "../filtros";

@Injectable({
  providedIn: "root",
})
export class RemitoService {
  private remitosUrl = "rest/remitos"; // URL to web api
  private filtro = <Filtro>{};

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.remitosUrl); // REST
  }
  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.remitosUrl}/${id}`);
  }
  getFiltro(): Filtro {
    return this.filtro;
  }
  setFiltro(filtro: Filtro) {
    this.filtro = filtro;
  }

  actualizar(remito: Remito): Observable<DataPackage> {
    return this.http.put<DataPackage>(`${this.remitosUrl}`, remito);
  }

  generar(fecha: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.remitosUrl}/generar?fecha=${fecha}`
    );
  }
  search(filtro: Filtro, page: number, cant: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.remitosUrl}/search?term=${filtro.cliente.name}&entregado=${filtro.entregadoFilter}&fecha=${filtro.selectedDate}&facturado=${filtro.facturadoFilter}&cuit=${filtro.cliente.cuit}&page=${page}&cant=${cant}`
    );
  }
}
