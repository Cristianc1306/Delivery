import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data.package";
import { Factura } from "./factura";
import { Filtro } from "../filtros";

@Injectable({
  providedIn: "root",
})
export class FacturaService {
  private facturasUrl = "rest/facturas"; // URL to web api
  private filtro = <Filtro>{};

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.facturasUrl); // REST
  }
  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.facturasUrl}/${id}`);
  }

  actualizar(factura: Factura): Observable<Factura> {
    return this.http.put<Factura>(`${this.facturasUrl}`, factura);
  }

  generar(): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.facturasUrl}/generar`);
  }
  vendido(
    fechaInicio: string,
    fechaFin: string,
    page: number,
    cant: number
  ): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.facturasUrl}/vendido?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${page}&cant=${cant}`
    );
  }

  getFiltro(): Filtro {
    return this.filtro;
  }
  setFiltro(filtro: Filtro) {
    this.filtro = filtro;
  }
  search(filtro: Filtro, page: number, cant: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.facturasUrl}/search?term=${filtro.cliente.name}&fecha=${filtro.selectedDate}&pagado=${filtro.facturadoFilter}&cuit=${filtro.cliente.cuit}&page=${page}&cant=${cant}`
    );
  }
}
