package unpsjb.labprog.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Remito {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private Date fechaArmado;

    private boolean entregado;

    @ManyToOne
    @JoinColumn(name = "domicilio_id")
    private Domicilio domicilio;

}