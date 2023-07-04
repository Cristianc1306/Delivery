package unpsjb.labprog.backend.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Articulo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

@Repository
public interface ArticuloRepository extends CrudRepository<Articulo, Integer> {

    @Query("SELECT a FROM Articulo a WHERE a.codigo = ?1")
    Optional<Articulo> findByCode(int code);

    @Query("SELECT a FROM Articulo a WHERE UPPER(a.nombre) LIKE CONCAT('%', UPPER(?1), '%') AND a.eliminado IS NULL")
    List<Articulo> search(String term);
}