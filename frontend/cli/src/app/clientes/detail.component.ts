import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Cliente } from "./cliente";
import { ClienteService } from "./cliente.service";
import { Domicilio } from "../domicilios/domicilio";
import { Localidad } from "../domicilios/localidad";

import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  map,
} from "rxjs/operators";

import { Observable, of } from "rxjs";
import { DomicilioService } from "../domicilios/domicilio.service";
import { ModalService } from "../modal.service";

@Component({
  selector: "app-detail",
  template: `
    <div *ngIf="cliente" class="bg-cover">
      <form #form="ngForm">
        <h5>
          {{
            cliente && cliente.id ? "Cliente Nº " + cliente.id : "Nuevo Cliente"
          }}
          &nbsp;&nbsp; &nbsp;&nbsp;
          <button
            (click)="save()"
            [disabled]="!form.valid"
            class="btn btn-success"
          >
            Guardar
          </button>
          &nbsp;&nbsp;
          <button (click)="goBack()" class="btn btn-danger">Cancelar</button>
        </h5>

        <div class="form-group">
          <label for="name">Nombre:</label>
          <input
            [(ngModel)]="cliente.name"
            name="name"
            placeholder="Nombre"
            class="form-control"
            required=""
            #name="ngModel"
          />
        </div>
        <div class="form-group">
          <label for="name">cuit:</label>
          <input
            [(ngModel)]="cliente.cuit"
            name="cuit"
            placeholder="cuit"
            class="form-control"
            required=""
          />
          <div *ngIf="cuitExists" class="alert alert-danger">
            El cuit ya está en uso por otro cliente.
          </div>
        </div>

        <ul></ul>
        <h5 class="mx-2">
          Domicilios &nbsp;&nbsp;&nbsp;&nbsp;
          <button (click)="addDomicilio()" class="btn btn-primary">
            NUEVO
          </button>
        </h5>
        <ul></ul>
        &nbsp;

        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Calle</th>
                <th>Altura</th>
                <th>Piso</th>
                <th>Localidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let domicilio of cliente.domicilios; index as i">
                <td>{{ i + 1 }}</td>
                <td>
                  <input
                    [(ngModel)]="domicilio.calle"
                    name="calle{{ i }}"
                    placeholder="Calle"
                    class="form-control"
                    required
                  />
                </td>
                <td>
                  <input
                    [(ngModel)]="domicilio.altura"
                    name="altura{{ i }}"
                    placeholder="Altura"
                    class="form-control"
                    required
                  />
                </td>
                <td>
                  <input
                    [(ngModel)]="domicilio.pisoDpto"
                    name="pisoDpto{{ i }}"
                    placeholder="Piso Dpto"
                    class="form-control"
                  />
                </td>
                <td>
                  <input
                    [(ngModel)]="domicilio.localidad"
                    name="localidad{{ i }}"
                    placeholder="Localidad"
                    class="form-control"
                    required
                    [ngbTypeahead]="searchLocalidad"
                    [editable]="false"
                    [resultFormatter]="resultFormat"
                    [inputFormatter]="inputFormat"
                    type="text"
                  />
                </td>
                <td>
                  <button
                    (click)="removeDomicilio(domicilio)"
                    class="btn btn-default"
                  >
                    <i class="fa fa-trash"></i>
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
export class DetailComponent {
  cliente: Cliente = <Cliente>{};
  cuitExists: boolean = false;
  searching: boolean = false;
  searchFailed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private clienteService: ClienteService,
    private domicilioService: DomicilioService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.get();
  }

  get(): void {
    const id = this.route.snapshot.paramMap.get("id")!;
    if (id === "0") {
      this.cliente.domicilios = [];
    } else {
      this.clienteService.get(id).subscribe((dataPackage) => {
        this.cliente = <Cliente>dataPackage.data;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.clienteService.save(this.cliente).subscribe(
      (dataPackage) => {
        this.goBack();
      },
      (error) => {
        this.cuitExists = true;
      }
    );
  }

  addDomicilio(): void {
    this.cliente.domicilios.push(<Domicilio>{});
  }

  searchLocalidad = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.domicilioService.search(term).pipe(
          map((response) => <Localidad[]>response.data),
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  resultFormat(value: any) {
    return value.nombre;
  }

  inputFormat(value: any) {
    if (value) return value.nombre;
    return null;
  }

  removeDomicilio(domicilio: Domicilio): void {
    this.modalService
      .confirm(
        "Eliminar domicilio",
        "¿Está seguro de borrar este domicilio?",
        "El cambio no se confirmará hasta que no guarde el cliente."
      )
      .then(
        (_) => {
          let domicilios = this.cliente.domicilios;
          domicilios.splice(domicilios.indexOf(domicilio), 1);
        },
        (_) => {}
      );
  }
}
