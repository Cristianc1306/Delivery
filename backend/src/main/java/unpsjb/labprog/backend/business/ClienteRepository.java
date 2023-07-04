package unpsjb.labprog.backend.business;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import unpsjb.labprog.backend.model.Cliente;

@Repository
public interface ClienteRepository extends CrudRepository<Cliente, Integer> {

    @Query("SELECT e FROM Cliente e WHERE e.cuit = ?1")
    Optional<Cliente> findByCode(String cuit);

    @Query("SELECT c FROM Cliente c WHERE UPPER(c.name) LIKE CONCAT('%', UPPER(?1), '%')  ORDER BY c.id DESC")
    List<Cliente> search(String term);

    @Query("SELECT c FROM Cliente c WHERE UPPER(c.name) LIKE CONCAT('%', UPPER(?1), '%') AND c.fechaDeBaja IS NULL ORDER BY c.id DESC")
    List<Cliente> searchClientesActivos(String term);

    @Query("SELECT c FROM Cliente c WHERE UPPER(c.name) LIKE CONCAT('%', UPPER(?1), '%') AND (c.fechaDeBaja IS NULL OR c.fechaDeBaja >= ?2) AND (c.cuit = ?3 OR ?3 = '')  ORDER BY c.id DESC")
    List<Cliente> searchHistorialClientes(String term, Date date, String cuit);

    @Query("SELECT c AS cliente, SUM(ap.precio) AS deuda " +
            "FROM ArticulosPedido ap " +
            "JOIN Factura f " +
            "JOIN Cliente c " +
            "WHERE f.fechaPago IS NULL AND ap.factura = f AND f.cliente = c " +
            "GROUP BY c.id ORDER BY deuda DESC")
    List<Object[]> getDeudaClientes();

}
