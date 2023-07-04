import { Component } from "@angular/core";
import { Articulo } from "./articulo";
import { ArticuloService } from "./articulo.service";
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
  selector: "app-articulos",
  template: ` <div
    class="table-responsive
    bg-cover"
  >
    <h4>Articulos</h4>

    <div>
      <input
        [(ngModel)]="articulo"
        name="customer"
        placeholder="articulo"
        class="form-control-sm "
        required
        [ngbTypeahead]="searchArticulos"
        [editable]="false"
        [resultFormatter]="resultFormat"
        [inputFormatter]="inputFormat"
        (ngModelChange)="onArticuloSelected()"
        type="text"
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
          <th class="table-header">Codigo</th>
          <th class="table-header">Articulo</th>
          <th class="table-header">Descripcion</th>
          <th class="table-header">Un.Med.</th>
          <th class="table-header">Precio</th>
          <th class="table-header">Stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let articulo of articulos; index as i">
          <td>{{ i + 1 }}</td>
          <td>{{ articulo.codigo }}</td>
          <td>
            {{ articulo.nombre }}
          </td>
          <th>{{ articulo.descripcion }}</th>
          <th>{{ articulo.unidadMedida }}</th>
          <th>{{ articulo.precio }}</th>
          <th>{{ articulo.stock }}</th>
          <td>
            <a routerLink="/articulos/{{ articulo.codigo }}">
              <i class="fa fa-pencil"></i>
            </a>
            &nbsp; &nbsp; &nbsp;
            <a (click)="remove(articulo.codigo)" style="cursor: pointer;">
              <i class="fa fa-trash"></i>
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
export class ArticulosComponent {
  articulos: Articulo[] = [];

  searching: boolean = false;
  searchFailed: boolean = false;
  articulo: Articulo = <Articulo>{};
  filtro!: Filtro;
  resultsPage: ResultsPage = <ResultsPage>{};
  pages: number[] = [];
  currentPage!: number;

  constructor(
    private articuloService: ArticuloService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getArticulos();
  }

  getArticulos(): void {
    this.filtro = this.articuloService.getFiltro();
    this.currentPage = this.filtro.currentPage;
    if (Object.keys(this.filtro).length === 0) {
      this.setearFiltro();
    }
    this.articulo = this.filtro.articulo;
    this.buscar();
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

  resultFormat(value: any) {
    return value.nombre;
  }
  inputFormat(value: any) {
    return value?.nombre;
  }
  onArticuloSelected(): void {
    if (this.articulo) {
      this.filtro.articulo = this.articulo;
      this.buscar();
    }
  }
  onChange() {
    this.currentPage = 0;
    this.buscar();
  }
  buscar() {
    this.articuloService
      .searchArticulos(this.filtro, this.currentPage, 5)
      .subscribe((dataPackage) => {
        this.resultsPage = <ResultsPage>dataPackage.data;
        this.articulos = <Articulo[]>this.resultsPage.content;
        this.pages = Array.from(Array(this.resultsPage.totalPages).keys());
      });
  }
  limpiarFiltro() {
    this.articuloService.setFiltro(<Filtro>{});
    this.getArticulos();
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
    this.filtro.articulo = <Articulo>{};
    this.filtro.articulo.nombre = "";
    this.currentPage = 0;
    this.filtro.currentPage = 0;
  }

  remove(code: number): void {
    this.modalService
      .confirm(
        "Eliminar Articulo",
        "¿Está seguro de borrar este Articulo?",
        "El cambio no se confirmará hasta que no guarde el Articulo."
      )
      .then(
        (_) => {
          this.articuloService.delete(code).subscribe((dataPackage) => {
            this.buscar();
          });
        },
        (_) => {}
      );
  }
}
