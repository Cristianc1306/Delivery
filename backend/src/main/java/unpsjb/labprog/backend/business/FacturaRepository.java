package unpsjb.labprog.backend.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Factura;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import java.util.Date;

@Repository
public interface FacturaRepository extends CrudRepository<Factura, Integer> {

    @Query("SELECT c AS cliente, SUM(ap.precio) AS total "
            + "FROM ArticulosPedido ap "
            + "JOIN ap.factura f "
            + "JOIN f.cliente c "
            + "WHERE DATE(f.fechaPago) BETWEEN DATE(:fechaInicio) AND DATE(:fechaFin)  "
            + "GROUP BY c "
            + "ORDER BY total DESC")
    List<Object[]> getTotalVendidoPorClienteEnPeriodo(Date fechaInicio, Date fechaFin);

    @Query("SELECT f FROM Factura f "
            + "WHERE (UPPER(f.cliente.name) LIKE CONCAT('%', UPPER(?1), '%') OR ?1 IS NULL) "
            + "AND DATE(f.fechaEmision) <= DATE(?2) "
            + "AND ((f.fechaPago IS NOT NULL AND ?3 = 'pagado') OR (f.fechaPago IS NULL AND ?3 = 'nopagado') OR ?3 = 'todos') "
            + "AND (f.cliente.cuit = ?4 OR ?4 = '') "
            + "ORDER BY f.id DESC")
    List<Factura> search(String term, Date date, String pagado, String cuit);
}