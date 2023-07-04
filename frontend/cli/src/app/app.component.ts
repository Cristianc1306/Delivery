import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div
      class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 
  bg-white text-black border-bottom shadow-sm border border-dark border-2 "
    >
      <h4 class="my-0 mr-md-auto font-weight-normal">Delivery</h4>

      <ul></ul>

      <div class="dropdown ">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Clientes
        </button>
        <ul class="dropdown-menu border border-dark border-2 ">
          <li><a class="dropdown-item" routerLink="/clientes">Listar</a></li>
          <li>
            <a class="dropdown-item" routerLink="/clientes/0">Nuevo</a>
          </li>
          <li>
            <a
              class="dropdown-item"
              routerLink="/cuentacorriente"
              [queryParams]="{ page: 0 }"
              >Cuenta Corriente</a
            >
          </li>
        </ul>
      </div>

      <ul></ul>

      <div class="dropdown ">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Pedidos
        </button>
        <ul class="dropdown-menu border border-dark border-2 ">
          <li><a class="dropdown-item" routerLink="/pedidos">Listar</a></li>
          <li>
            <a class="dropdown-item" routerLink="/pedidos/0">Nuevo</a>
          </li>
        </ul>
      </div>

      <ul></ul>

      <div class="dropdown ">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Remitos
        </button>
        <ul class="dropdown-menu border border-dark border-2 ">
          <li>
            <a
              class="dropdown-item"
              routerLink="/remitos"
              [queryParams]="{ remitos: 'listar' }"
              >Listar</a
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              routerLink="/remitos"
              [queryParams]="{ remitos: 'entregar' }"
              >Entregar</a
            >
          </li>
          <li>
            <a class="dropdown-item" routerLink="/articulospedidosentregados"
              >Articulos Pedidos</a
            >
          </li>
        </ul>
      </div>

      <ul></ul>

      <div class="dropdown ">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Facturas
        </button>
        <ul class="dropdown-menu border border-dark border-2 ">
          <li>
            <a class="dropdown-item" routerLink="/facturas">Listar</a>
          </li>
        </ul>
      </div>

      <ul></ul>

      <div class="dropdown ">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Articulos
        </button>
        <ul class="dropdown-menu border border-dark border-2 ">
          <li><a class="dropdown-item" routerLink="/articulos">Listar</a></li>
          <li>
            <a class="dropdown-item" routerLink="/articulos/0">Nuevo</a>
          </li>
        </ul>
      </div>

      <ul></ul>

      <div class="dropdown ">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Procesos
        </button>
        <ul class="dropdown-menu border border-dark border-2 ">
          <li>
            <a class="dropdown-item" routerLink="/articulospedidos"
              >Generar Remitos</a
            >
          </li>
          <li>
            <a class="dropdown-item" routerLink="/remito/entregados/sinfacturar"
              >Generar Facturas</a
            >
          </li>
        </ul>
      </div>

      <ul></ul>

      <div class="dropdown ">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Ranking
        </button>
        <ul class="dropdown-menu border border-dark border-2 ">
          <li>
            <a class="dropdown-item" routerLink="/ranking/articulospedidos"
              >Articulos Pedidos</a
            >
          </li>
          <li>
            <a class="dropdown-item" routerLink="/ventas">Ventas</a>
          </li>
        </ul>
      </div>

      <nav class="my-2 my-md-0 ms-auto ">
        <a class="p-2 text-primary " routerLink="/"> Home </a>
      </nav>
    </div>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  title = "cli";
}
