package unpsjb.labprog.backend.business;

import java.util.List;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.Articulo;
import unpsjb.labprog.backend.model.ArticulosPedido;
import unpsjb.labprog.backend.model.Cliente;
import unpsjb.labprog.backend.model.Domicilio;
import unpsjb.labprog.backend.model.Factura;
import unpsjb.labprog.backend.model.Remito;

@Service
public class ProcesoService {

    @Autowired
    ArticulosPedidoService articulosPedidoService;

    @Autowired
    RemitoService remitoService;

    @Autowired
    ArticuloService articuloService;

    @Autowired
    FacturaService facturaService;

    public List<Remito> generarRemitos(Date fecha) {
        List<Remito> remitos = new ArrayList<>();

        List<ArticulosPedido> articulosPedido = articulosPedidoService.findArticulosPedidoSinRemitos(fecha);

        Domicilio domicilio = articulosPedido.get(0).getPedido().getDomicilio();
        Remito remito = null;
        Articulo articulo = null;
        List<ArticulosPedido> articulosARemitir = new ArrayList<>();

        for (ArticulosPedido articulosSinProcesar : articulosPedido) {

            if (!articulosSinProcesar.getPedido().getDomicilio().equals(domicilio)) {
                if (!articulosARemitir.isEmpty()) {
                    remito = new Remito();
                    remito.setFechaArmado(fecha);
                    remito.setEntregado(false);
                    remito.setDomicilio(domicilio);
                    remito = this.remitoService.save(remito);

                    for (ArticulosPedido articulos : articulosARemitir) {
                        articulos.setRemito(remito);
                        this.articulosPedidoService.save(articulos);
                    }
                    remitos.add(remito);
                }

                domicilio = articulosSinProcesar.getPedido().getDomicilio();
                articulosARemitir.clear();
            }

            if (articulosSinProcesar.getArticulo().getStock() >= articulosSinProcesar.getCantidad()) {
                articulo = articulosSinProcesar.getArticulo();
                articulo.setStock(articulo.getStock() - articulosSinProcesar.getCantidad());
                articuloService.save(articulo);

                articulosARemitir.add(articulosSinProcesar);

            }
        }

        if (!articulosARemitir.isEmpty()) {
            remito = new Remito();
            remito.setFechaArmado(fecha);
            remito.setEntregado(false);
            remito.setDomicilio(domicilio);
            remito = this.remitoService.save(remito);

            for (ArticulosPedido articulos : articulosARemitir) {
                articulos.setRemito(remito);
                this.articulosPedidoService.save(articulos);
            }
            remitos.add(remito);
        }

        return remitos;
    }

    public List<Factura> generarFacturas() {
        List<Factura> facturas = new ArrayList<>();
        Date date = new Date();

        List<ArticulosPedido> articulosPedido = articulosPedidoService.findArticulosPedidoEntregado();

        Cliente cliente = articulosPedido.get(0).getPedido().getCliente();
        Factura factura = new Factura();
        factura.setFechaEmision(date);
        factura.setCliente(cliente);
        factura = this.facturaService.save(factura);
        facturas.add(factura);

        for (ArticulosPedido articulosSinProcesar : articulosPedido) {

            if (!articulosSinProcesar.getPedido().getCliente().equals(cliente)) {
                cliente = articulosSinProcesar.getPedido().getCliente();
                factura = new Factura();
                factura.setFechaEmision(date);
                factura.setCliente(cliente);
                factura = this.facturaService.save(factura);
                facturas.add(factura);
            }

            articulosSinProcesar.setFactura(factura);
            articulosPedidoService.save(articulosSinProcesar);
        }

        return facturas;
    }
}