package unpsjb.labprog.backend.model;

import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Localidad {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String nombre;
    private String cp;

    @ManyToOne
    @JoinColumn(name = "provincia_id")
    private Provincia provincia;
}