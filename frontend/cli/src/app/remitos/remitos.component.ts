import { Component } from "@angular/core";
import { Remito } from "./remito";
import { RemitoService } from "./remito.service";

import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from "rxjs/operators";

import { Observable, of } from "rxjs";

import { Cliente } from "../clientes/cliente";
import { ClienteService } from "../clientes/cliente.service";
import { Filtro } from "../filtros";
import { ResultsPage } from "../results-page";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-remitos",
  template: ` <div
    class="table-responsive
   bg-cover"
  >
    <h4>Remitos</h4>
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
      <select
        id="entregadoFilter"
        [(ngModel)]="filtro.entregadoFilter"
        (change)="onChange()"
      >
        <option value="">Todos</option>
        <option value="true">Entregados</option>
        <option value="false">No Entregados</option>
      </select>
      &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
      <input
        [(ngModel)]="filtro.selectedDate"
        name="fechaFin"
        class="form-control-sm"
        type="date"
        (ngModelChange)="onChange()"
      />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <select
        id="facturadoFilter"
        [(ngModel)]="filtro.facturadoFilter"
        (change)="onChange()"
      >
        <option value="todos">Todos</option>
        <option value="facturado">Facturados</option>
        <option value="nofacturado">No Facturados</option>
      </select>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <button (click)="limpiarFiltro()" class="btn btn-danger btn-sm">
        Limpiar
      </button>
    </div>

    &nbsp; &nbsp;
    <ul></ul>
    <table class="table table-striped table-sm custom-table">
      <thead>
        <tr>
          <th class="table-header">#</th>
          <th class="table-header">Fecha</th>
          <th class="table-header">Cliente</th>
          <th class="table-header">Domicilio</th>
          <th class="table-header">Total</th>
          <th class="table-header">Entregado</th>
          <th class="table-header">N Factura</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let remito of remitos; index as i">
          <td>{{ remito.id }}</td>
          <td>{{ remito.fechaArmado | date : "dd/MM/yyyy" : "UTC+0" }}</td>
          <td>
            {{ remito.articulosPedido[0].pedido.cliente.name }}({{
              remito.articulosPedido[0].pedido.cliente.cuit
            }})
          </td>
          <th>{{ remito.domicilio.calle }} {{ remito.domicilio.altura }}</th>
          <th>{{ remito.total | number : "1.2-2" }}</th>

          <th>{{ remito.entregado ? "Sí" : "No" }}</th>
          <th>
            {{
              remito.articulosPedido[0].factura
                ? remito.articulosPedido[0].factura.id
                : "-"
            }}
          </th>

          <td>
            <a routerLink="/remitos/{{ remito.id }}">
              <i class="fa fa-eye"></i>
            </a>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>

          <td>
            <button
              (click)="entregar(remito)"
              class="btn btn-success btn-sm"
              *ngIf="!remito.entregado && entregarRemitos == 'entregar'"
            >
              Entregado
            </button>
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
export class RemitosComponent {
  remitos: Remito[] = [];
  cliente: Cliente = <Cliente>{};
  searching: boolean = false;
  searchFailed: boolean = false;

  filtro!: Filtro;
  resultsPage: ResultsPage = <ResultsPage>{};
  pages: number[] = [];
  currentPage!: number;
  entregarRemitos = "";

  constructor(
    private remitoService: RemitoService,
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.entregarRemitos = params["remitos"];
    });
    this.getRemitos();
  }

  getRemitos(): void {
    this.filtro = this.remitoService.getFiltro();
    this.currentPage = this.filtro.currentPage;
    if (Object.keys(this.filtro).length === 0) {
      this.setearFiltro();
    }
    this.cliente = this.filtro.cliente;
    this.searchRemitos();
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
      this.searchRemitos();
    }
  }
  onChange() {
    this.currentPage = 0;
    this.searchRemitos();
  }
  searchRemitos() {
    this.remitoService
      .search(this.filtro, this.currentPage, 5)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
        this.remitos = <Remito[]>this.resultsPage.content;
        this.pages = Array.from(Array(this.resultsPage.totalPages).keys());
      });
  }
  limpiarFiltro() {
    this.remitoService.setFiltro(<Filtro>{});
    this.getRemitos();
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
    this.searchRemitos();
  }
  entregar(remito: Remito) {
    remito.entregado = true;
    this.remitoService.actualizar(remito).subscribe((dataPackage) => {
      this.searchRemitos();
    });
  }
  setearFiltro() {
    let today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Los meses se indexan desde 0, por lo que se suma 1
    const year = today.getFullYear();
    this.filtro.selectedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    this.filtro.entregadoFilter = "";
    this.filtro.facturadoFilter = "todos";
    this.filtro.cliente = <Cliente>{};
    this.filtro.cliente.name = "";
    this.filtro.cliente.cuit = "";
    this.currentPage = 0;
    this.filtro.currentPage = 0;
  }
}
