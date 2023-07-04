import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { Cliente } from "../clientes/cliente";
import { Observable, of } from "rxjs";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from "rxjs/operators";

import { Domicilio } from "../domicilios/domicilio";
import { ActivatedRoute } from "@angular/router";
import { ClienteService } from "../clientes/cliente.service";
import { PedidoService } from "./pedido.service";
import { ArticulosPedido } from "../articulospedido/articulospedido";
import { ArticuloService } from "../articulos/articulo.service";
import { Articulo } from "../articulos/articulo";
import { ModalService } from "../modal.service";
import { Pedido } from "./pedido";

@Component({
  selector: "app-detail-pedi",
  template: `
    <div *ngIf="pedido" class="bg-cover">
      <form #form="ngForm">
        &nbsp; &nbsp; &nbsp;
        <div class="d-flex align-items-center">
          <h5>
            {{
              pedido && pedido.id ? "Pedido Nº " + pedido.id : "Nuevo Pedido"
            }}
          </h5>
          &nbsp; &nbsp; &nbsp;
          <button
            (click)="save()"
            class="btn btn-success"
            [disabled]="
              !form.valid ||
              !pedido.domicilio ||
              pedido.articulosPedido.length === 0
            "
          >
            Guardar
          </button>

          &nbsp; &nbsp; &nbsp;
          <button (click)="goBack()" class="btn btn-danger">Atras</button>
        </div>
        <ul></ul>
        <div class="d-flex align-items-center">
          <span class="bg-secondary text-white p-2 mx-2">Nombre</span>

          <input
            [(ngModel)]="pedido.cliente"
            name="cliente"
            placeholder="Cliente"
            class="form-control-sm"
            required
            [ngbTypeahead]="searchClientes"
            [editable]="false"
            [resultFormatter]="resultFormat"
            [inputFormatter]="inputFormat"
            (ngModelChange)="onSelectedClient()"
            [disabled]="pedido.id ? true : false"
          />

          <span class="bg-secondary text-white p-2 mx-3">Cuit</span>

          <div class="mx-2 ">{{ pedido.cliente?.cuit }}</div>
        </div>

        <ul></ul>

        <div class="d-flex align-items-center">
          <span class="bg-secondary text-white p-2 mx-2">Domicilio</span>

          <select
            [(ngModel)]="pedido.domicilio"
            class="form-control-sm"
            id="type"
            name="type"
            [disabled]="pedido.id ? true : false"
          >
            <option value="">Seleccione un domicilio</option>
            <option
              *ngFor="let domicilio of pedido.cliente?.domicilios"
              [ngValue]="
                pedido.domicilio.calle && pedido.id
                  ? pedido.domicilio
                  : domicilio
              "
            >
              {{
                pedido.domicilio.calle && pedido.id
                  ? pedido.domicilio.calle
                  : domicilio.calle
              }}
            </option>
          </select>

          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <span class="bg-secondary text-white p-2 mx-4">Altura</span>
          <div class="mx-2">{{ pedido.domicilio?.altura }}</div>
        </div>

        <ul></ul>

        <div class="d-flex align-items-center">
          <span class="bg-secondary text-white p-2 mx-2">Depto/Piso</span>
          <div class="mx-5">{{ pedido.domicilio?.pisoDpto }}</div>
          <div class="mx-5"></div>

          <span class="bg-secondary text-white p-2 mx-2">Localidad</span>
          <div class="mx-2">
            {{ pedido.domicilio?.localidad?.nombre }}
          </div>
        </div>

        <ul></ul>

        <div class="d-flex align-items-center">
          <h5 class="mx-2">Articulos</h5>
          &nbsp; &nbsp; &nbsp;
          <button
            (click)="addArticulosPedido()"
            class="btn btn-primary"
            [disabled]="pedido.id ? true : false"
          >
            NUEVO
          </button>
          <ul></ul>
          <ul></ul>
          <ul></ul>
          <span class="bg-secondary text-white p-2 mx-2">TOTAL</span>
          <div class="mx-2">{{ pedido.total | number : "1.2-2" }}</div>
        </div>

        <ul></ul>
        <div class="table-responsive">
          <table class="table table-striped table-sm custom-table">
            <thead>
              <tr>
                <th class="table-header">#</th>
                <th class="table-header">Codigo</th>
                <th class="table-header">Articulo</th>
                <th class="table-header">Descripcion</th>
                <th class="table-header">Un.Med</th>
                <th class="table-header">Cantidad</th>
                <th class="table-header">Precio</th>
                <th class="table-header">Total</th>
                <th class="table-header">Remito</th>
                <th class="table-header">Factura</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                *ngFor="
                  let articulosPedido of pedido.articulosPedido;
                  index as i
                "
              >
                <td>{{ i + 1 }}</td>

                <td>{{ articulosPedido.articulo?.codigo }}</td>
                <td>
                  <input
                    [(ngModel)]="articulosPedido.articulo"
                    name="articulo{{ i }}"
                    placeholder="Código"
                    class="form-control-sm"
                    required
                    [ngbTypeahead]="searchArticulo"
                    [editable]="false"
                    [resultFormatter]="resultArticuloFormat"
                    [inputFormatter]="inputArticuloFormat"
                    [disabled]="pedido.id ? true : false"
                  />
                </td>
                <td>
                  {{ articulosPedido.articulo?.descripcion }}
                </td>
                <td>
                  {{ articulosPedido.articulo?.unidadMedida }}
                </td>
                <td>
                  <input
                    [(ngModel)]="articulosPedido.cantidad"
                    name="cantidad{{ i }}"
                    placeholder="Cantidad"
                    class="form-control-sm"
                    (ngModelChange)="onChangeCantidad(articulosPedido)"
                    [disabled]="pedido.id ? true : false"
                    required
                  />
                </td>
                <td>
                  {{ articulosPedido.articulo?.precio | number : "1.2-2" }}
                </td>
                <td>
                  {{ articulosPedido.precio | number : "1.2-2" }}
                </td>
                <td>
                  {{ articulosPedido.remito?.id }}
                  <a routerLink="/remitos/{{ articulosPedido.remito?.id }}">
                    <i
                      *ngIf="pedido.id && articulosPedido.remito?.id"
                      class="fa fa-eye"
                    ></i>
                  </a>
                </td>
                <td>
                  {{ articulosPedido.factura?.id }}
                  <a routerLink="/facturas/{{ articulosPedido.factura?.id }}">
                    <i
                      *ngIf="pedido.id && articulosPedido.factura?.id"
                      class="fa fa-eye"
                    ></i>
                  </a>
                </td>
                <td>
                  <button
                    (click)="removeArticuloPedido(articulosPedido)"
                    class="btn btn-default"
                    *ngIf="!pedido.id"
                  >
                    <i class="fa fa-trash" title="Eliminar"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class DetailPediComponent {
  pedido: Pedido = <Pedido>{};
  searching: boolean = false;
  searchFailed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private articuloService: ArticuloService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    this.pedido.articulosPedido = [];
    if (+id != 0) {
      this.pedidoService.get(+id).subscribe((dataPackage) => {
        this.pedido = <Pedido>dataPackage.data;
      });
    }
  }

  searchClientes = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) => {
        return this.clienteService.searchClientesActivos(term).pipe(
          map((response) => <Cliente[]>response.data),
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
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

  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.pedido.fecha = new Date();
    this.pedidoService.create(this.pedido).subscribe();
    this.goBack();
  }

  searchArticulo = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) => {
        return this.articuloService.search(term).pipe(
          map((response) => <Articulo[]>response.data),
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        );
      }),
      tap(() => (this.searching = false))
    );

  resultArticuloFormat(value: any) {
    return value.nombre;
  }

  inputArticuloFormat(value: any) {
    return value?.nombre;
  }
  addArticulosPedido(): void {
    this.pedido.articulosPedido.push(<ArticulosPedido>{});
  }
  removeArticuloPedido(articuloPedido: ArticulosPedido): void {
    this.modalService
      .confirm(
        "Eliminar artículo pedido",
        "¿Está seguro de borrar este artículo pedido?",
        "El cambio no se confirmará hasta que no guarde el pedido."
      )
      .then(
        (_) => {
          this.pedido.articulosPedido.splice(
            this.pedido.articulosPedido.indexOf(articuloPedido),
            1
          );
          this.calcularTotal();
        },
        (_) => {}
      );
  }
  onSelectedClient() {
    this.pedido.domicilio = <Domicilio>{};
  }
  onChangeCantidad(articulosPedido: ArticulosPedido) {
    articulosPedido.precio =
      articulosPedido.articulo.precio * articulosPedido.cantidad;
    this.calcularTotal();
  }
  calcularTotal() {
    this.pedido.total = this.pedido.articulosPedido.reduce(
      (total, articulosP) => total + articulosP.precio,
      0
    );
  }
}
