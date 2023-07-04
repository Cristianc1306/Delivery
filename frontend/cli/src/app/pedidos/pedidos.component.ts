import { Component } from "@angular/core";
import { PedidoService } from "./pedido.service";
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
import { Pedido } from "./pedido";
@Component({
  selector: "app-pedidos",
  template: ` <div
    class="table-responsive
    bg-cover"
  >
    <h4>Pedidos</h4>

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
        id="recepcionCompletado"
        [(ngModel)]="filtro.recepcionCompletado"
        (change)="onChange()"
      >
        <option value="todos">Todos</option>
        <option value="completado">Confeccion Completado</option>
        <option value="nocompletado">Confeccion No Completado</option>
      </select>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <button (click)="limpiarFiltro()" class="btn btn-danger btn-sm">
        Limpiar
      </button>
    </div>
    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
    <ul></ul>

    <table class="table table-striped table-sm custom-table">
      <thead>
        <tr>
          <th class="table-header">#</th>
          <th class="table-header">Fecha</th>
          <th class="table-header">Cliente</th>
          <th class="table-header">Domicilio</th>
          <th class="table-header">Total</th>
          <th class="table-header">Confeccion Completado</th>

          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let pedido of pedidos; index as i">
          <td>{{ pedido.id }}</td>
          <td>{{ pedido.fecha | date : "dd/MM/yyyy" : "UTC+0" }}</td>
          <td>{{ pedido.cliente.name }}({{ pedido.cliente.cuit }})</td>
          <th>
            {{ pedido.domicilio.calle }}
            {{ pedido.domicilio.altura }}
          </th>
          <th>{{ pedido.total | number : "1.2-2" }}</th>
          <th>{{ pedido.completado ? "Sí" : "No" }}</th>
          <td>
            <a routerLink="/pedidos/{{ pedido.id }}">
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
export class PedidosComponent {
  pedidos: Pedido[] = [];

  cliente: Cliente = <Cliente>{};
  searching: boolean = false;
  searchFailed: boolean = false;

  filtro!: Filtro;
  resultsPage: ResultsPage = <ResultsPage>{};
  pages: number[] = [];
  currentPage!: number;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.getPedidos();
  }

  getPedidos(): void {
    this.filtro = this.pedidoService.getFiltro();
    this.currentPage = this.filtro.currentPage;
    if (Object.keys(this.filtro).length === 0) {
      this.setearFiltro();
    }
    this.cliente = this.filtro.cliente;
    this.searchPedidos();
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
      this.searchPedidos();
    }
  }
  onChange() {
    this.currentPage = 0;
    this.searchPedidos();
  }
  searchPedidos() {
    this.pedidoService
      .search(this.filtro, this.currentPage, 5)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
        this.pedidos = <Pedido[]>this.resultsPage.content;
        this.pages = Array.from(Array(this.resultsPage.totalPages).keys());
      });
  }
  limpiarFiltro() {
    this.pedidoService.setFiltro(<Filtro>{});
    this.getPedidos();
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
    this.searchPedidos();
  }
  setearFiltro() {
    let today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Los meses se indexan desde 0, por lo que se suma 1
    const year = today.getFullYear();
    this.filtro.selectedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    this.filtro.recepcionCompletado = "todos";
    this.filtro.cliente = <Cliente>{};
    this.filtro.cliente.name = "";
    this.filtro.cliente.cuit = "";
    this.currentPage = 0;
    this.filtro.currentPage = 0;
  }
}
