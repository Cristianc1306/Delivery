import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data.package";
import { Filtro } from "../filtros";

@Injectable({
  providedIn: "root",
})
export class ArticulosPedidoService {
  private articulospUrl = "rest/articulospedidos"; // URL to web api
  private filtro = <Filtro>{};

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.articulospUrl); // REST
  }
  getFiltro(): Filtro {
    return this.filtro;
  }
  setFiltro(filtro: Filtro) {
    this.filtro = filtro;
  }
  search(filtro: Filtro, page: number, cant: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.articulospUrl}/search?cliente=${filtro.cliente.name}&cuit=${filtro.cliente.cuit}&articulo=${filtro.articulo.nombre}&page=${page}&cant=${cant}`
    );
  }

  articulosSinRemito(fecha: String): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.articulospUrl}/sinremito/${fecha}`
    );
  }
  articulosEntregados(): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.articulospUrl}/entregados`);
  }
  rankingArticulos(
    fechaInicio: string,
    fechaFin: string,
    page: number,
    cant: number
  ): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.articulospUrl}/ranking?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}&page=${page}&cant=${cant}`
    );
  }
}
