package unpsjb.labprog.backend.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Remito;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface RemitoRepository extends CrudRepository<Remito, Integer> {

    @Query("SELECT e FROM Remito e JOIN ArticulosPedido ap "
            + "WHERE (?1 IS NULL OR UPPER(ap.pedido.cliente.name) LIKE CONCAT('%', UPPER(?1), '%')) "
            + "AND (e.entregado = ?2 OR ?2 IS NULL) "
            + "AND DATE(e.fechaArmado) <= DATE(?3) "
            + "AND e = ap.remito "
            + "AND ((ap.factura IS NOT NULL AND ?4 = 'facturado') OR (ap.factura IS NULL AND ?4 = 'nofacturado') OR ?4 = 'todos') "
            + "AND (ap.pedido.cliente.cuit = ?5 OR ?5 = '') "
            + "ORDER BY e.id DESC")
    List<Remito> search(String term, Boolean entregado, Date date, String facturado, String cuit);
}