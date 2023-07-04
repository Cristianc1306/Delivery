import { Component } from "@angular/core";
import { CuentaCorriente } from "./cuenta-corriente";
import { ResultsPage } from "../../results-page";
import { ClienteService } from "../cliente.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FacturaService } from "src/app/facturas/factura.service";
import { Filtro } from "src/app/filtros";
import { Cliente } from "../cliente";

@Component({
  selector: "app-cuenta-corriente",
  template: `
    <div class="bg-cover">
      <h4>Cuentas Corrientes</h4>

      &nbsp;
      <table class="table table-striped table-sm custom-table">
        <thead>
          <tr>
            <th class="table-header">#</th>
            <th class="table-header">Nombre</th>
            <th class="table-header">Cuit</th>
            <th class="table-header">Deuda</th>
            <th class="table-header">Facturas Pendientes</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cuenta of cuentasCorriente; index as i">
            <td>{{ i + resultsPage.size * resultsPage.number + 1 }}</td>
            <td>{{ cuenta.cliente.name }}</td>
            <td>{{ cuenta.cliente.cuit }}</td>
            <th>{{ cuenta.deuda | number : "1.2-2" }}</th>

            <td>
              &nbsp; &nbsp; &nbsp;
              <i
                (click)="setearFiltro(cuenta.cliente)"
                class="fa fa-search"
                style="cursor: pointer;"
              ></i>
            </td>
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
export class CuentaCorrienteComponent {
  cuentasCorriente: CuentaCorriente[] = <CuentaCorriente[]>[];
  resultsPage: ResultsPage = <ResultsPage>{};
  pages: number[] = [];
  currentPage: number = 0;
  filtro = <Filtro>{};
  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
    private facturaService: FacturaService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = parseInt(params["page"]);
    });
    this.getCuentasCorrientes();
  }

  getCuentasCorrientes(): void {
    this.clienteService
      .getDeudaClientes(this.currentPage, 5)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
        this.cuentasCorriente = <CuentaCorriente[]>this.resultsPage.content;
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
    this.router.navigate([], {
      queryParams: {
        page: page,
      },
    });
    this.getCuentasCorrientes();
  }

  setearFiltro(cliente: Cliente) {
    this.filtro = this.facturaService.getFiltro();
    let today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Los meses se indexan desde 0, por lo que se suma 1
    const year = today.getFullYear();
    this.filtro.selectedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    this.filtro.cliente = <Cliente>{};
    this.filtro.cliente.name = cliente.name;
    this.filtro.cliente.cuit = cliente.cuit;
    this.filtro.facturadoFilter = "nopagado";
    this.filtro.currentPage = 0;
    this.router.navigate(["facturas"]);
  }
}
