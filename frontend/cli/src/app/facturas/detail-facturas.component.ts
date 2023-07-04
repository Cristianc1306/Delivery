import { Component } from "@angular/core";
import { Location } from "@angular/common";

import { ActivatedRoute } from "@angular/router";

import { FacturaService } from "../facturas/factura.service";
import { Factura } from "../facturas/factura";

@Component({
  selector: "app-detail-facturas",
  template: `
    <div *ngIf="factura.id" class="bg-cover">
      &nbsp; &nbsp; &nbsp;
      <div class="d-flex align-items-center">
        <h5 class="mx-2">Factura Nº {{ factura.id }}</h5>
        &nbsp; &nbsp; &nbsp;

        <button (click)="goBack()" class="btn btn-danger">Atras</button>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
        <button
          (click)="save()"
          class="btn btn-success"
          [disabled]="factura.fechaPago !== null"
        >
          Pagar
        </button>
      </div>
      <ul></ul>
      <div class="d-flex align-items-center">
        <span class="bg-secondary text-white p-2 mx-2">Nombre</span>
        <div class="mx-3 ">{{ factura.cliente.name }}</div>

        <span class="bg-secondary text-white p-2 mx-2">Cuit</span>

        <div class="mx-2 ">{{ factura.cliente.cuit }}</div>

        <span class="bg-secondary text-white p-2 mx-2">Fecha Pago</span>

        <div class="mx-2 ">
          {{ factura.fechaPago | date : "dd/MM/yyyy" : "UTC+0" }}
        </div>
      </div>

      <ul></ul>

      <div class="d-flex align-items-center">
        <h5 class="mx-2">Articulos</h5>

        &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
        <span class="bg-secondary text-white p-2 mx-2">TOTAL</span>
        <div class="mx-2">{{ factura.total | number : "1.2-2" }}</div>
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
              <th class="table-header">Remito</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="
                let articulosPedido of factura.articulosPedido;
                index as i
              "
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
                {{ articulosPedido.remito.id }}
                <a routerLink="/remitos/{{ articulosPedido.remito.id }}">
                  <i class="fa fa-eye"></i>
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
export class DetailFacturasComponent {
  factura: Factura = <Factura>{};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private facturaService: FacturaService
  ) {}

  ngOnInit() {
    this.get();
  }
  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;

    this.facturaService.get(+id).subscribe((dataPackage) => {
      this.factura = <Factura>dataPackage.data;
    });
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.factura.fechaPago = new Date();
    this.facturaService.actualizar(this.factura).subscribe();
    this.goBack();
  }
}
