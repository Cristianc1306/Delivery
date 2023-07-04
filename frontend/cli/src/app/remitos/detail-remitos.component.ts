import { Component } from "@angular/core";
import { Location } from "@angular/common";

import { ActivatedRoute } from "@angular/router";
import { RemitoService } from "./remito.service";
import { Remito } from "./remito";

@Component({
  selector: "app-detail-remitos",
  template: `
    <div *ngIf="remito.id" class="bg-cover">
      &nbsp; &nbsp; &nbsp;
      <div class="d-flex align-items-center">
        <h5 class="mx-2">Remito Nº {{ remito.id }}</h5>
        &nbsp; &nbsp; &nbsp;
        <button (click)="save()" class="btn btn-success">Guardar</button>
        &nbsp; &nbsp; &nbsp;
        <button (click)="goBack()" class="btn btn-danger">Atras</button>
      </div>
      <ul></ul>
      <div class="d-flex align-items-center">
        <span class="bg-secondary text-white p-2 mx-2">Nombre</span>
        <div class="mx-3 ">
          {{ remito.articulosPedido[0].pedido.cliente.name }}
        </div>

        <span class="bg-secondary text-white p-2 mx-2">Cuit</span>

        <div class="mx-2 ">
          {{ remito.articulosPedido[0].pedido.cliente.cuit }}
        </div>
      </div>

      <ul></ul>

      <div class="d-flex align-items-center">
        <span class="bg-secondary text-white p-2 mx-2">Domicilio</span>
        <div class="mx-3">{{ remito.domicilio.calle }}</div>

        <span class="bg-secondary text-white p-2 mx-2">Altura</span>
        <div class="mx-2">{{ remito.domicilio.altura }}</div>
      </div>

      <ul></ul>

      <div class="d-flex align-items-center">
        <span class="bg-secondary text-white p-2 mx-2">Depto/Piso</span>
        <div class="mx-5">{{ remito.domicilio.pisoDpto }}</div>

        <span class="bg-secondary text-white p-2 mx-2">Localidad</span>
        <div class="mx-2">{{ remito.domicilio.localidad.nombre }}</div>
      </div>
      <ul></ul>

      <div class="d-flex align-items-center">
        <h5 class="mx-2">Articulos</h5>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <input
          type="checkbox"
          [(ngModel)]="remito.entregado"
          [disabled]="remito.articulosPedido[0].factura ? true : false"
        />
        &nbsp; Entregado &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
        &nbsp; &nbsp;
        <span class="bg-secondary text-white p-2 mx-2">TOTAL</span>
        <div class="mx-2">{{ remito.total | number : "1.2-2" }}</div>
      </div>

      <ul></ul>
      <div class="table-responsive">
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
              <th class="table-header">Pedido</th>
              <th class="table-header">Factura</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="let articulosPedido of remito.articulosPedido; index as i"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ articulosPedido.articulo.id }}</td>
              <td>{{ articulosPedido.articulo.nombre }}</td>
              <td>{{ articulosPedido.articulo.descripcion }}</td>
              <td>{{ articulosPedido.articulo.unidadMedida }}</td>
              <td>{{ articulosPedido.cantidad }}</td>
              <td>{{ articulosPedido.articulo.precio }}</td>
              <td>{{ articulosPedido.precio }}</td>
              <td>
                {{ articulosPedido.pedido.id }}
                <a routerLink="/pedidos/{{ articulosPedido.pedido.id }}">
                  <i class="fa fa-eye"></i>
                </a>
              </td>

              <td>
                {{ articulosPedido.factura?.id }}
                <a routerLink="/facturas/{{ articulosPedido.factura?.id }}">
                  <i *ngIf="articulosPedido.factura?.id" class="fa fa-eye"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [],
})
export class DetailRemitosComponent {
  remito: Remito = <Remito>{};
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private remitoService: RemitoService
  ) {}

  ngOnInit() {
    this.get();
  }
  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;

    this.remitoService.get(+id).subscribe((dataPackage) => {
      this.remito = <Remito>dataPackage.data;
    });
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.remitoService.actualizar(this.remito).subscribe();
    this.goBack();
  }
}
