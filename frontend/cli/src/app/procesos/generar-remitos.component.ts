import { Component } from "@angular/core";
import { ArticulosPedidoService } from "../articulospedido/articulospedido.service";
import { ArticulosPedido } from "../articulospedido/articulospedido";
import { RemitoService } from "../remitos/remito.service";
import { ModalService } from "../modal.service";
import { Remito } from "../remitos/remito";

@Component({
  selector: "app-generar-remitos",
  template: `
    <div class="bg-cover">
      <ul></ul>
      <div class="form-group ">
        &nbsp; &nbsp;
        <input
          [(ngModel)]="selectedDate"
          name="fechaFin"
          class="form-control-md"
          type="date"
          required
          (ngModelChange)="getArticulosPedidos()"
        />

        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
        <button
          [disabled]="articulosPedidos.length === 0"
          (click)="generarRemitos()"
          class="btn btn-primary"
        >
          Generar Remitos
        </button>
      </div>

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
              <th class="table-header">Pedido</th>
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
              <td>{{ articulosPedido.remito?.id }}</td>
              <td>
                {{ articulosPedido.pedido?.id }}
                <a routerLink="/pedidos/{{ articulosPedido.pedido.id }}">
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
export class GenerarRemitosComponent {
  articulosPedidos: ArticulosPedido[] = [];
  selectedDate = "";

  constructor(
    private articulosPedidosService: ArticulosPedidoService,
    private remitoService: RemitoService,
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
      .articulosSinRemito(this.selectedDate)
      .subscribe(
        (dataPackage) =>
          (this.articulosPedidos = <ArticulosPedido[]>dataPackage.data)
      );
  }
  generarRemitos() {
    this.remitoService.generar(this.selectedDate).subscribe((dataPackage) => {
      this.informarRemitosGenerados((<Remito[]>dataPackage.data).length);
    });
  }
  informarRemitosGenerados(cant: number): void {
    this.modalService.inform("Se ha generado " + cant + " remitos").then(
      (_) => {
        this.getArticulosPedidos();
      },
      (_) => {}
    );
  }
}
