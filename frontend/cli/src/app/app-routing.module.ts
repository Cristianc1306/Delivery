import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { DetailComponent } from "./clientes/detail.component";
import { PedidosComponent } from "./pedidos/pedidos.component";
import { DetailPediComponent } from "./pedidos/detail-pedi.component";
import { ArticulospedidoComponent } from "./articulospedido/articulospedido.component";
import { ArticulosComponent } from "./articulos/articulos.component";
import { DetailArticulosComponent } from "./articulos/detail-articulos.component";
import { RemitosComponent } from "./remitos/remitos.component";
import { DetailRemitosComponent } from "./remitos/detail-remitos.component";
import { FacturasComponent } from "./facturas/facturas.component";
import { DetailFacturasComponent } from "./facturas/detail-facturas.component";
import { GenerarRemitosComponent } from "./procesos/generar-remitos.component";
import { GenerarFacturasComponent } from "./procesos/generar-facturas.component";
import { RankingVentasComponent } from "./rankings/ranking-ventas.component";
import { RankingArticulospedidosComponent } from "./rankings/ranking-articulospedidos.component";
import { CuentaCorrienteComponent } from "./clientes/cuentacorriente/cuenta-corriente.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "clientes", component: ClientesComponent },
  { path: "clientes/:id", component: DetailComponent },
  { path: "pedidos", component: PedidosComponent },
  { path: "pedidos/:id", component: DetailPediComponent },
  { path: "articulospedidosentregados", component: ArticulospedidoComponent },
  { path: "articulos", component: ArticulosComponent },
  { path: "articulos/:id", component: DetailArticulosComponent },
  { path: "remitos", component: RemitosComponent },
  { path: "remitos/:id", component: DetailRemitosComponent },
  { path: "facturas", component: FacturasComponent },
  { path: "facturas/:id", component: DetailFacturasComponent },
  { path: "articulospedidos", component: GenerarRemitosComponent },
  {
    path: "remito/entregados/sinfacturar",
    component: GenerarFacturasComponent,
  },
  {
    path: "ventas",
    component: RankingVentasComponent,
  },
  {
    path: "ranking/articulospedidos",
    component: RankingArticulospedidosComponent,
  },
  {
    path: "cuentacorriente",
    component: CuentaCorrienteComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
