import { Component } from "@angular/core";
import { Factura } from "./factura";
import { FacturaService } from "./factura.service";
import { Location } from "@angular/common";
import { Observable, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from "rxjs/operators";
import { Cliente } from "../clientes/cliente";
import { Filtro } from "../filtros";
import { ResultsPage } from "../results-page";
import { ClienteService } from "../clientes/cliente.service";

@Component({
  selector: "app-facturas",
  template: ` <div
    class="table-responsive
    bg-cover"
  >
    <h4>Facturas</h4>

    <div>
      <input
        [(ngModel)]="cliente"
        name="customer"
        placeholder="Cliente"
        class="form-control-sm "
        required
        [ngbTypeahead]="searchClientes"
        [editable]="false"
        [resultFormatter]="resultFormat"
        [inputFormatter]="inputFormat"
        (ngModelChange)="onClienteSelected()"
        type="text"
      />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <label> Fecha Creado: </label>
      &nbsp;
      <input
        [(ngModel)]="filtro.selectedDate"
        name="fechaFin"
        class="form-control-sm"
        type="date"
        required
        (ngModelChange)="onChange()"
      />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <select
        id="facturadoFilter"
        [(ngModel)]="filtro.facturadoFilter"
        (change)="onChange()"
      >
        <option value="todos">Todos</option>
        <option value="pagado">Pagados</option>
        <option value="nopagado">No Pagados</option>
      </select>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <button (click)="limpiarFiltro()" class="btn btn-danger btn-sm">
        Limpiar
      </button>

      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

      <i
        (click)="goBack()"
        class="fa fa-arrow-left"
        style="cursor: pointer;"
      ></i>
    </div>
    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
    <ul></ul>
    <table class="table table-striped table-sm custom-table">
      <thead>
        <tr>
          <th class="table-header">#</th>
          <th class="table-header">Fecha Creado</th>
          <th class="table-header">Cliente</th>
          <th class="table-header">Total</th>
          <th class="table-header">Fecha Pago</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let factura of facturas; index as i">
          <td>{{ factura.id }}</td>
          <td>{{ factura.fechaEmision | date : "dd/MM/yyyy" : "UTC+0" }}</td>
          <td>{{ factura.cliente.name }}({{ factura.cliente.cuit }})</td>
          <th>{{ factura.total | number : "1.2-2" }}</th>

          <td>{{ factura.fechaPago | date : "dd/MM/yyyy" : "UTC+0" }}</td>
          <td>
            <a routerLink="/facturas/{{ factura.id }}">
              <i class="fa fa-eye"></i>
            </a>
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
  </div>`,
  styles: [],
})
export class FacturasComponent {
  facturas: Factura[] = [];
  cliente: Cliente = <Cliente>{};
  searching: boolean = false;
  searchFailed: boolean = false;

  filtro!: Filtro;
  resultsPage: ResultsPage = <ResultsPage>{};
  pages: number[] = [];
  currentPage!: number;

  constructor(
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getFacturas();
  }

  getFacturas(): void {
    this.filtro = this.facturaService.getFiltro();
    this.currentPage = this.filtro.currentPage;
    if (Object.keys(this.filtro).length === 0) {
      this.setearFiltro();
    }
    this.cliente = this.filtro.cliente;
    this.searchFacturas();
  }

  searchClientes = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) => {
        this.filtro.cliente.name = term;
        this.onChange();
        return this.clienteService.search(term).pipe(
          map((response) => <Cliente[]>response.data),
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            this.onChange();
            return of([]);
          })
        );
      }),
      tap(() => (this.searching = false))
    );

  resultFormat(value: any) {
    return value.name + "(" + value.cuit + ")";
  }
  inputFormat(value: any) {
    return value?.name;
  }
  onClienteSelected(): void {
    this.filtro.cliente.cuit = "";
    if (this.cliente) {
      this.filtro.cliente = this.cliente;
      this.searchFacturas();
    }
  }
  onChange() {
    this.currentPage = 0;
    this.searchFacturas();
  }
  searchFacturas() {
    this.facturaService
      .search(this.filtro, this.currentPage, 5)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
        this.facturas = <Factura[]>this.resultsPage.content;
        this.pages = Array.from(Array(this.resultsPage.totalPages).keys());
      });
  }
  goBack(): void {
    this.location.back();
  }
  limpiarFiltro() {
    this.facturaService.setFiltro(<Filtro>{});
    this.getFacturas();
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
    this.filtro.currentPage = page;
    this.currentPage = page;
    this.searchFacturas();
  }

  setearFiltro() {
    let today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Los meses se indexan desde 0, por lo que se suma 1
    const year = today.getFullYear();
    this.filtro.selectedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    this.filtro.facturadoFilter = "todos";
    this.filtro.cliente = <Cliente>{};
    this.filtro.cliente.name = "";
    this.filtro.cliente.cuit = "";
    this.currentPage = 0;
    this.filtro.currentPage = 0;
  }
}
