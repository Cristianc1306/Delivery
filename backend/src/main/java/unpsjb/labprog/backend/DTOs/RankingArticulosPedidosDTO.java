package unpsjb.labprog.backend.DTOs;

import lombok.Getter;
import lombok.Setter;
import unpsjb.labprog.backend.model.Articulo;

@Getter
@Setter
public class RankingArticulosPedidosDTO {
    private Articulo articulo;
    private double total;
    private long cantidadPedida;

    public RankingArticulosPedidosDTO(Articulo articulo, double total, int cantidadPedida) {
        this.articulo = articulo;
        this.total = total;
        this.cantidadPedida = cantidadPedida;
    }
}
