import { Component } from "@angular/core";
import { ArticulosPedidoService } from "../articulospedido/articulospedido.service";
import { ResultsPage } from "../results-page";
import { RankingArticulo } from "./ranking-articulospedidos";

@Component({
  selector: "app-ranking-articulospedidos",
  template: `
    <div class="bg-cover">
      <h4>Ranking Articulos Pedidos</h4>
      <div>
        &nbsp;
        <label for="selectedDate">Fecha Desde:</label>
        &nbsp;
        <input
          [(ngModel)]="selectedDateInicio"
          name="fechaInicio"
          class="form-control-sm"
          type="date"
          required
          (ngModelChange)="getArticulosPedidos()"
        />
        &nbsp;
        <label for="selectedDate">Fecha Hasta:</label>
        &nbsp;
        <input
          [(ngModel)]="selectedDateFin"
          name="fechaFin"
          class="form-control-sm"
          type="date"
          required
          (ngModelChange)="getArticulosPedidos()"
        />
        &nbsp;
        <label *ngIf="errorMessage" class="error-message">{{
          errorMessage
        }}</label>
      </div>
      &nbsp;
      <table class="table table-striped table-sm custom-table">
        <thead>
          <tr>
            <th class="table-header">#</th>
            <th class="table-header">Nombre</th>
            <th class="table-header">Descripcion</th>
            <th class="table-header">Ingreso Generado</th>
            <th class="table-header">Cantidad Pedida</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let articulosPedido of articulosPedidos; index as i">
            <td>{{ i + resultsPage.size * resultsPage.number + 1 }}</td>
            <td>{{ articulosPedido.articulo.nombre }}</td>
            <td>{{ articulosPedido.articulo.descripcion }}</td>
            <th>{{ articulosPedido.total | number : "1.2-2" }}</th>
            <th>{{ articulosPedido.cantidadPedida }}</th>
            <td></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">
              <nav aria-label="Page navigation example">
                <ul class="pagination pagination-centered">
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-2)">&laquo;</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-1)">&lsaquo;</a>
                  </li>
                  <li *ngFor="let t of pages">
                    <a
                      class="page-link"
                      (click)="showPage(t)"
                      [ngClass]="{ active: t === currentPage }"
                    >
                      {{ t + 1 }}
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-3)">&rsaquo;</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" (click)="showPage(-4)">&raquo;</a>
                  </li>
                </ul>
              </nav>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  `,
  styles: [],
})
export class RankingArticulospedidosComponent {
  selectedDateInicio = "";
  selectedDateFin = "";
  articulosPedidos: RankingArticulo[] = <RankingArticulo[]>[];
  resultsPage: ResultsPage = <ResultsPage>{};
  pages: number[] = [];
  currentPage: number = 0;
  errorMessage: string = "";

  constructor(private articulosPedidoService: ArticulosPedidoService) {}

  ngOnInit() {
    let today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    // Restar 7 días a la fecha de inicio
    const startDate = new Date(year, month - 1, day);
    startDate.setDate(startDate.getDate() - 7);

    this.selectedDateInicio = `${startDate.getFullYear()}-${(
      startDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${startDate.getDate().toString().padStart(2, "0")}`;
    this.selectedDateFin = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    this.getArticulosPedidos();
  }

  getArticulosPedidos(): void {
    if (this.selectedDateInicio > this.selectedDateFin) {
      this.errorMessage = "La fecha de desde es mayor que la fecha de hasta";
      return;
    }
    this.errorMessage = "";
    this.articulosPedidoService
      .rankingArticulos(
        this.selectedDateInicio,
        this.selectedDateFin,
        this.currentPage,
        5
      )
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
        this.articulosPedidos = <RankingArticulo[]>this.resultsPage.content;
        this.pages = Array.from(Array(this.resultsPage.totalPages).keys());
      });
  }
  showPage(pageId: number): void {
    let page = pageId;
    if (pageId == -2) {
      // First
      page = 0;
    }
    if (pageId == -1) {
      // Previous
      page = this.currentPage > 0 ? this.currentPage - 1 : this.currentPage;
    }
    if (pageId == -3) {
      // Next
      page = !this.resultsPage.last ? this.currentPage + 1 : this.currentPage;
    }
    if (pageId == -4) {
      // Last
      page = this.resultsPage.totalPages - 1;
    }
    if (pageId > 1 && this.pages.length >= pageId) {
      // Number
      page = this.pages[pageId - 1] + 1;
    }
    this.currentPage = page;
    this.getArticulosPedidos();
  }
}
