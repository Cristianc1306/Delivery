import { Component } from "@angular/core";
import { ArticulosPedido } from "../articulospedido/articulospedido";
import { ArticulosPedidoService } from "../articulospedido/articulospedido.service";
import { Router } from "@angular/router";
import { FacturaService } from "../facturas/factura.service";
import { ModalService } from "../modal.service";
import { Factura } from "../facturas/factura";

@Component({
  selector: "app-generar-facturas",
  template: `
    <div class="bg-cover">
      <ul></ul>
      &nbsp;
      <input
        [(ngModel)]="selectedDate"
        name="fechaFin"
        class="form-control-md"
        type="date"
        [disabled]="true"
      />
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
      <button
        (click)="generarFacturas()"
        [disabled]="articulosPedidos.length === 0"
        class="btn btn-primary"
      >
        Generar Facturas
      </button>

      <ul></ul>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
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
              <th class="table-header">Stock</th>
              <th class="table-header">Precio</th>
              <th class="table-header">Total</th>
              <th class="table-header">Remito</th>
              <th class="table-header">Entregado</th>
              <th class="table-header">Factura</th>
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
              <td>{{ articulosPedido.articulo.stock }}</td>
              <td>{{ articulosPedido.articulo.precio }}</td>
              <td>{{ articulosPedido.precio }}</td>
              <td>
                {{ articulosPedido.remito?.id }}
                <a routerLink="/remitos/{{ articulosPedido.remito.id }}">
                  <i class="fa fa-eye"></i>
                </a>
              </td>
              <th>{{ articulosPedido.remito.entregado ? "Sí" : "No" }}</th>
              <td>{{ articulosPedido.factura?.id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [],
})
export class GenerarFacturasComponent {
  articulosPedidos: ArticulosPedido[] = [];
  selectedDate = "";
  constructor(
    private articulosPedidosService: ArticulosPedidoService,
    private facturaService: FacturaService,
    private router: Router,
    private modalService: ModalService
  ) {}
  ngOnInit() {
    let today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Los meses se indexan desde 0, por lo que se suma 1
    const year = today.getFullYear();

    this.selectedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    this.getArticulosPedidos();
  }
  getArticulosPedidos() {
    this.articulosPedidosService
      .articulosEntregados()
      .subscribe(
        (dataPackage) =>
          (this.articulosPedidos = <ArticulosPedido[]>dataPackage.data)
      );
  }
  generarFacturas() {
    this.facturaService
      .generar()
      .subscribe((dataPackage) =>
        this.informarFacturasGeneradas((<Factura[]>dataPackage.data).length)
      );
  }
  informarFacturasGeneradas(cant: number): void {
    this.modalService.inform("Se ha generado " + cant + " facturas").then(
      (_) => {
        this.router.navigate(["facturas"]);
      },
      (_) => {}
    );
  }
}
