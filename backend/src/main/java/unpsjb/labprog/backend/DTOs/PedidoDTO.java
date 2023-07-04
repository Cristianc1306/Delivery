package unpsjb.labprog.backend.DTOs;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import unpsjb.labprog.backend.model.Cliente;
import unpsjb.labprog.backend.model.Domicilio;
import unpsjb.labprog.backend.model.ArticulosPedido;

import unpsjb.labprog.backend.model.Pedido;

@Getter
@Setter
public class PedidoDTO {

    private int id;

    private Date fecha;

    private String observaciones;

    private Domicilio domicilio;

    private Cliente cliente;

    private Pedido pedido;

    private Double total;

    private Boolean completado;

    private List<ArticulosPedido> articulosPedido;

    public PedidoDTO(Pedido pedido, Double total, Boolean completado, List<ArticulosPedido> articulosPedido) {
        if (pedido != null) {
            this.id = pedido.getId();
            this.fecha = pedido.getFecha();
            this.observaciones = pedido.getObservaciones();
            this.domicilio = pedido.getDomicilio();
            this.cliente = pedido.getCliente();
        }

        this.total = total;
        this.completado = completado;
        this.articulosPedido = articulosPedido;

    }
}
