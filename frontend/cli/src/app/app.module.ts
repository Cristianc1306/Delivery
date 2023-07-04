import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientesComponent,
    DetailComponent,
    PedidosComponent,
    DetailPediComponent,
    ArticulospedidoComponent,
    ArticulosComponent,
    DetailArticulosComponent,
    RemitosComponent,
    DetailRemitosComponent,
    FacturasComponent,
    DetailFacturasComponent,
    GenerarRemitosComponent,
    GenerarFacturasComponent,
    RankingVentasComponent,
    RankingArticulospedidosComponent,
    CuentaCorrienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
