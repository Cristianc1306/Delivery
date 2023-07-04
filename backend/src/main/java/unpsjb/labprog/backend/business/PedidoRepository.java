package unpsjb.labprog.backend.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import unpsjb.labprog.backend.model.Pedido;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface PedidoRepository extends CrudRepository<Pedido, Integer> {
    @Query("SELECT p FROM Pedido p " +
            "WHERE (?1 IS NULL OR UPPER(p.cliente.name) LIKE CONCAT('%', UPPER(?1), '%')) " +
            "AND  DATE(p.fecha) <=  DATE(?2) " +
            "AND ((?3 = 'completado' AND NOT EXISTS " +
            "(SELECT ap FROM ArticulosPedido ap WHERE ap.pedido = p AND ap.remito IS NULL)) " +
            "OR (?3 = 'nocompletado' AND EXISTS " +
            "(SELECT ap FROM ArticulosPedido ap WHERE ap.pedido = p AND ap.remito IS NULL)) " +
            "OR ?3 = 'todos') AND (p.cliente.cuit = ?4 OR ?4 = '')  ORDER BY p.id DESC")
    List<Pedido> search(String cliente, Date fecha, String estado, String cuit);
}