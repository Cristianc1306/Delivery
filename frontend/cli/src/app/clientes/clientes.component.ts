import { Component } from "@angular/core";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import { Observable, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from "rxjs/operators";
import { Filtro } from "../filtros";
import { ResultsPage } from "../results-page";
import { ModalService } from "../modal.service";

@Component({
  selector: "app-clientes",
  template: `
    <div class="table-responsive bg-cover">
      <h4>Clientes</h4>

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
        &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
        <input
          [(ngModel)]="filtro.selectedDate"
          name="fechaFin"
          class="form-control-sm"
          type="date"
          required
          (ngModelChange)="onChange()"
        />
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
            <th class="table-header">Nombre</th>
            <th class="table-header">Cuit</th>
            <th class="table-header">Fecha De Baja</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let cliente of clientes; index as i">
            <td>{{ i + 1 }}</td>
            <td>{{ cliente.name }}</td>
            <td>{{ cliente.cuit }}</td>
            <td>{{ cliente.fechaDeBaja | date : "dd/MM/yyyy" : "UTC+0" }}</td>

            <td>
              <a
                *ngIf="!cliente.fechaDeBaja"
                routerLink="/clientes/{{ cliente.cuit }}"
              >
                <i class="fa fa-pencil"></i>
              </a>
              &nbsp; &nbsp; &nbsp;

              <a
                *ngIf="!cliente.fechaDeBaja"
                (click)="remove(cliente.cuit)"
                style="cursor: pointer;"
              >
                <i class="fa fa-trash"></i>
              </a>
              &nbsp; &nbsp;
              <a
                *ngIf="cliente.fechaDeBaja"
                (click)="restaurarCliente(cliente)"
                style="cursor: pointer;"
              >
                <i class="fa fa-undo"></i>
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
    </div>
  `,
  styles: [],
})
export class ClientesComponent {
  clientes: Cliente[] = [];
  clienteSeleccionado: Cliente = <Cliente>{};
  selectedDate!: string;

  searching: boolean = false;
  searchFailed: boolean = false;
  cliente: Cliente = <Cliente>{};
  filtro!: Filtro;
  resultsPage: ResultsPage = <ResultsPage>{};
  pages: number[] = [];
  currentPage!: number;

  constructor(
    private clienteService: ClienteService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getClientes();
  }

  getClientes(): void {
    this.filtro = this.clienteService.getFiltro();
    this.currentPage = this.filtro.currentPage;
    if (Object.keys(this.filtro).length === 0) {
      this.setearFiltro();
    }
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
    this.clienteService
      .searchClientes(this.filtro, this.currentPage, 5)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
        this.clientes = <Cliente[]>this.resultsPage.content;
        this.pages = Array.from(Array(this.resultsPage.totalPages).keys());
      });
  }
  limpiarFiltro() {
    this.clienteService.setFiltro(<Filtro>{});
    this.getClientes();
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
  remove(id: string): void {
    this.modalService
      .confirm(
        "Eliminar Cliente",
        "¿Está seguro de borrar este Cliente?",
        "El cambio no se confirmará hasta que no guarde el cliente."
      )
      .then(
        (_) => {
          let today = new Date();
          const day = today.getDate();
          const month = today.getMonth() + 1; // Los meses se indexan desde 0, por lo que se suma 1
          const year = today.getFullYear();
          this.selectedDate = `${year}-${month < 10 ? "0" + month : month}-${
            day < 10 ? "0" + day : day
          }`;
          this.clienteService
            .delete(id, this.selectedDate)
            .subscribe((dataPackage) => {
              this.buscar();
            });
        },
        (_) => {}
      );
  }
  restaurarCliente(cliente: Cliente) {
    this.modalService
      .confirm(
        "Restaurar Cliente",
        "¿Está seguro de restaurar este Cliente?",
        "El cambio no se confirmará hasta que no guarde el cliente."
      )
      .then(
        (_) => {
          this.clienteService.save(cliente).subscribe((dataPackage) => {
            this.buscar();
          });
        },
        (_) => {}
      );
  }
  setearFiltro() {
    let today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Los meses se indexan desde 0, por lo que se suma 1
    const year = today.getFullYear();
    this.filtro.selectedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    this.filtro.cliente = <Cliente>{};
    this.filtro.cliente.name = "";
    this.filtro.cliente.cuit = "";
    this.currentPage = 0;
    this.filtro.currentPage = 0;
  }
}
