package unpsjb.labprog.backend.DTOs;

import lombok.Getter;
import lombok.Setter;
import unpsjb.labprog.backend.model.Cliente;

@Getter
@Setter
public class RankingVentasDTO {
    private Cliente cliente;
    private Double total;

    public RankingVentasDTO(Cliente cliente, Double total) {
        this.cliente = cliente;
        this.total = total;
    }
}
