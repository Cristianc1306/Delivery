import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataPackage } from "../data.package";

@Injectable({
  providedIn: "root",
})
export class DomicilioService {
  private localidadesUrl = "rest/localidades";
  constructor(private http: HttpClient) {}

  search(text: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.localidadesUrl}/search/${text}`);
  }
}
