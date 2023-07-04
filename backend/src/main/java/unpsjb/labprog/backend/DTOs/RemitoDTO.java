package unpsjb.labprog.backend.DTOs;

import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import unpsjb.labprog.backend.model.Domicilio;
import unpsjb.labprog.backend.model.Remito;
import unpsjb.labprog.backend.model.ArticulosPedido;
import unpsjb.labprog.backend.model.Cliente;

@Getter
@Setter
public class RemitoDTO {
    private int id;

    private Date fechaArmado;

    private boolean entregado;

    private Domicilio domicilio;

    private Cliente cliente;

    private List<ArticulosPedido> articulosPedido;
    private Double total;

    public RemitoDTO(Remito remito, Double total, List<ArticulosPedido> articulosPedido) {
        this.id = remito.getId();
        this.fechaArmado = remito.getFechaArmado();
        this.entregado = remito.isEntregado();
        this.domicilio = remito.getDomicilio();
        this.total = total;
        this.articulosPedido = articulosPedido;
        this.cliente = articulosPedido.get(0).getPedido().getCliente();
    }
}
