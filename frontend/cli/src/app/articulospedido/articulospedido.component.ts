import { Component } from "@angular/core";
import { ArticulosPedido } from "./articulospedido";
import { Filtro } from "../filtros";
import { Cliente } from "../clientes/cliente";
import { ResultsPage } from "../results-page";
import { Articulo } from "../articulos/articulo";
import { ArticulosPedidoService } from "./articulospedido.service";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from "rxjs/operators";

import { Observable, of } from "rxjs";
import { ClienteService } from "../clientes/cliente.service";
import { ArticuloService } from "../articulos/articulo.service";

@Component({
  selector: "app-articulospedido",
  template: ` <div
    class="table-responsive
    bg-cover"
  >
    <h4>Articulos Pedidos Entregados</h4>
    <ul></ul>
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
        [(ngModel)]="articulo"
        name="customer"
        placeholder="articulo"
        class="form-control-sm "
        required
        [ngbTypeahead]="searchArticulos"
        [editable]="false"
        [resultFormatter]="resultFormatArticulo"
        [inputFormatter]="inputFormatArticulo"
        (ngModelChange)="onArticuloSelected()"
        type="text"
      />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <button (click)="limpiarFiltro()" class="btn btn-danger btn-sm">
        Limpiar
      </button>
    </div>
    <ul></ul>
    <table class="table table-striped table-sm custom-table">
      <thead>
        <tr>
          <th class="table-header">#</th>
          <th class="table-header">id</th>
          <th class="table-header">Articulo</th>
          <th class="table-header">Descripcion</th>
          <th class="table-header">Un.med.</th>
          <th class="table-header">Cantidad</th>
          <th class="table-header">Precio</th>
          <th class="table-header">Total</th>
          <th class="table-header">Remito</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let articulosPedido of articulosPedidos; index as i">
          <td>{{ i + 1 }}</td>
          <td>{{ articulosPedido.articulo.id }}</td>
          <td>{{ articulosPedido.articulo.nombre }}</td>
          <td>{{ articulosPedido.articulo.descripcion }}</td>
          <td>{{ articulosPedido.articulo.unidadMedida }}</td>
          <td>{{ articulosPedido.cantidad }}</td>
          <td>{{ articulosPedido.articulo.precio }}</td>
          <td>{{ articulosPedido.precio }}</td>
          <td>
            {{ articulosPedido.remito.id }}
            <a routerLink="/remitos/{{ articulosPedido.remito.id }}">
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
export class ArticulospedidoComponent {
  articulosPedidos = <ArticulosPedido[]>{};
  cliente: Cliente = <Cliente>{};
  articulo: Articulo = <Articulo>{};
  searching: boolean = false;
  searchFailed: boolean = false;

  filtro!: Filtro;
  resultsPage: ResultsPage = <ResultsPage>{};
  pages: number[] = [];
  currentPage!: number;

  constructor(
    private articulosPedidoService: ArticulosPedidoService,
    private clienteService: ClienteService,
    private articuloService: ArticuloService
  ) {}

  ngOnInit() {
    this.getArticulosPedidos();
  }

  getArticulosPedidos(): void {
    this.filtro = this.articulosPedidoService.getFiltro();
    this.currentPage = this.filtro.currentPage;
    if (Object.keys(this.filtro).length === 0) {
      this.setearFiltro();
    }
    this.articulo = this.filtro.articulo;
    this.cliente = this.filtro.cliente;
    this.buscar();
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
  searchArticulos = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) => {
        this.filtro.articulo.nombre = term;
        this.onChange();
        return this.articuloService.search(term).pipe(
          map((response) => <Articulo[]>response.data),
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

  resultFormatArticulo(value: any) {
    return value.nombre;
  }
  inputFormatArticulo(value: any) {
    return value?.nombre;
  }
  onArticuloSelected(): void {
    if (this.articulo) {
      this.filtro.articulo = this.articulo;
      this.buscar();
    }
  }
  onClienteSelected(): void {
    this.filtro.cliente.cuit = "";
    if (this.cliente) {
      this.filtro.cliente = this.cliente;
      this.buscar();
    }
  }
  onChange() {
    this.currentPage = 0;
    this.buscar();
  }
  buscar() {
    this.articulosPedidoService
      .search(this.filtro, this.currentPage, 5)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
        this.articulosPedidos = <ArticulosPedido[]>this.resultsPage.content;
        this.pages = Array.from(Array(this.resultsPage.totalPages).keys());
      });
  }
  limpiarFiltro() {
    this.articulosPedidoService.setFiltro(<Filtro>{});
    this.getArticulosPedidos();
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
    this.buscar();
  }

  setearFiltro() {
    this.filtro.cliente = <Cliente>{};
    this.filtro.cliente.name = "";
    this.filtro.cliente.cuit = "";
    this.filtro.articulo = <Articulo>{};
    this.filtro.articulo.nombre = "";
    this.currentPage = 0;
    this.filtro.currentPage = 0;
  }
}
