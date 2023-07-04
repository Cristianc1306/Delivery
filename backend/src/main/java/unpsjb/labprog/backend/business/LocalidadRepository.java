package unpsjb.labprog.backend.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Localidad;

import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository

public interface LocalidadRepository extends CrudRepository<Localidad, Integer> {
    @Query("SELECT a FROM Localidad a WHERE UPPER(a.nombre) LIKE CONCAT('%', UPPER(?1), '%')")
    List<Localidad> search(String term);

}
