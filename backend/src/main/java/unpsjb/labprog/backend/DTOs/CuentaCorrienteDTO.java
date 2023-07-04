package unpsjb.labprog.backend.DTOs;

import lombok.Getter;
import lombok.Setter;
import unpsjb.labprog.backend.model.Cliente;

@Getter
@Setter

public class CuentaCorrienteDTO {
    private Cliente cliente;
    private Double deuda;

    public CuentaCorrienteDTO(Cliente cliente, Double deuda) {
        this.cliente = cliente;
        this.deuda = deuda;
    }

}
