package unpsjb.labprog.backend.DTOs;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import unpsjb.labprog.backend.model.ArticulosPedido;
import unpsjb.labprog.backend.model.Cliente;
import unpsjb.labprog.backend.model.Factura;

@Getter
@Setter
public class FacturaDTO {

    private int id;

    private Date fechaEmision;

    private Date fechaPago;

    private Cliente cliente;

    List<ArticulosPedido> articulosPedido;

    private Double total;

    public FacturaDTO(Factura factura, Double total, List<ArticulosPedido> articulosPedido) {
        this.id = factura.getId();
        this.fechaEmision = factura.getFechaEmision();
        this.fechaPago = factura.getFechaPago();
        this.cliente = factura.getCliente();
        this.total = total;
        this.articulosPedido = articulosPedido;

    }
}
