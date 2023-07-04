import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ArticuloService } from "./articulo.service";
import { ActivatedRoute } from "@angular/router";
import { Articulo } from "./articulo";

@Component({
  selector: "app-detail-articulos",
  template: `
    <div *ngIf="articulo" class="bg-cover">
      <form #form="ngForm">
        <h5 class="mx-2">
          {{
            articulo && articulo.id
              ? "Ariculo Nº " + articulo.id
              : "Nuevo Articulo"
          }}
          &nbsp;&nbsp;
          <button
            (click)="save()"
            [disabled]="form.invalid"
            class="btn btn-success"
          >
            Guardar
          </button>
          &nbsp;&nbsp;
          <button (click)="goBack()" class="btn btn-danger">Cancelar</button>
        </h5>
        <ul></ul>
        &nbsp;&nbsp;

        <div class="form-inline">
          <div class="form-group input-group">
            <span class="bg-secondary text-white p-2">Codigo</span>
            &nbsp;&nbsp;
            <input
              [(ngModel)]="articulo.codigo"
              name="codigo"
              placeholder="Codigo"
              class="form-control"
              required
              #name="ngModel"
            />
          </div>
          <div *ngIf="codigoExists" class="alert alert-danger">
            El codigo ya está en uso por otro Articulo.
          </div>
          &nbsp;
          <div class="form-group input-group">
            <span class="bg-secondary text-white p-2">Articulo</span>
            &nbsp;&nbsp;
            <input
              [(ngModel)]="articulo.nombre"
              name="nombre"
              placeholder="Nombre"
              class="form-control"
              required
              #name="ngModel"
            />
          </div>
          &nbsp;
          <div class="form-group  input-group ">
            <span class="bg-secondary text-white p-2">Descripcion</span>
            &nbsp;&nbsp;
            <input
              [(ngModel)]="articulo.descripcion"
              name="descripcion"
              placeholder="descripcion"
              class="form-control"
              required
            />
          </div>
          &nbsp;
          <div class="form-group input-group">
            <span class="bg-secondary text-white p-2">Unidad Med.</span>
            &nbsp;&nbsp;
            <input
              [(ngModel)]="articulo.unidadMedida"
              name="unidadMedida"
              placeholder="unidadMedida"
              class="form-control"
              required
            />
          </div>
          &nbsp;
          <div class="form-group input-group">
            <span class="bg-secondary text-white p-2">Precio</span>
            &nbsp;&nbsp;
            <input
              [(ngModel)]="articulo.precio"
              name="precio"
              placeholder="precio"
              class="form-control"
              required
            />
          </div>
          &nbsp;
          <div class="form-group input-group">
            <span class="bg-secondary text-white p-2">Stock</span>
            &nbsp;&nbsp;
            <input
              [(ngModel)]="articulo.stock"
              name="stock"
              placeholder="stock"
              class="form-control"
              required
            />
          </div>
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class DetailArticulosComponent {
  articulo!: Articulo;
  codigoExists: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private articuloService: ArticuloService
  ) {}

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (+id === 0) {
      this.articulo = <Articulo>{};
    } else {
      this.articuloService
        .get(+id)
        .subscribe(
          (dataPackage) => (this.articulo = <Articulo>dataPackage.data)
        );
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.articuloService.save(this.articulo).subscribe(
      (dataPackage) => {
        this.goBack();
      },
      (error) => {
        this.codigoExists = true;
      }
    );
  }
}
