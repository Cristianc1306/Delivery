import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { DataPackage } from "../data.package";
import { Articulo } from "./articulo";
import { Filtro } from "../filtros";

@Injectable({
  providedIn: "root",
})
export class ArticuloService {
  private articulosUrl = "rest/articulos"; // URL to web api
  private filtro = <Filtro>{};

  constructor(private http: HttpClient) {}

  all(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.articulosUrl); // REST
  }
  get(id: number): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.articulosUrl}/${id}`);
  }

  save(articulo: Articulo): Observable<DataPackage> {
    return this.http[articulo.id ? "put" : "post"]<DataPackage>(
      this.articulosUrl,
      articulo
    );
  }
  delete(code: number): Observable<DataPackage> {
    return this.http.delete<DataPackage>(`${this.articulosUrl}/${code}`);
  }
  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.articulosUrl}/search/${text}`);
  }
  getFiltro(): Filtro {
    return this.filtro;
  }
  setFiltro(filtro: Filtro) {
    this.filtro = filtro;
  }
  searchArticulos(
    filtro: Filtro,
    page: number,
    cant: number
  ): Observable<DataPackage> {
    return this.http.get<DataPackage>(
      `${this.articulosUrl}/search?term=${filtro.articulo.nombre}&page=${page}&cant=${cant}`
    );
  }
}
