package unpsjb.labprog.backend.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Pedido;
import unpsjb.labprog.backend.model.Remito;
import unpsjb.labprog.backend.model.Factura;
import unpsjb.labprog.backend.model.ArticulosPedido;
import java.util.List;
import java.util.Date;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface ArticulosPedidoRepository extends CrudRepository<ArticulosPedido, Integer> {

        List<ArticulosPedido> findByPedido(Pedido pedido);

        List<ArticulosPedido> findByRemito(Remito remito);

        List<ArticulosPedido> findByFactura(Factura factura);

        @Query("SELECT ap FROM ArticulosPedido ap WHERE ap.remito IS NULL AND DATE(ap.pedido.fecha) <= DATE(?1) " +
                        "ORDER BY ap.pedido.domicilio ASC")
        List<ArticulosPedido> findArticulosPedidoSinRemitos(Date fecha);

        @Query("SELECT ap FROM ArticulosPedido ap WHERE ap.remito.entregado = true AND ap.factura IS NULL ORDER BY ap.pedido.cliente.id ASC")
        List<ArticulosPedido> findArticulosPedidoEntregado();

        @Query("SELECT ap.articulo, SUM(ap.precio) AS totalPrecio , SUM(ap.cantidad) AS cantidadPedida FROM ArticulosPedido ap "
                        +
                        "JOIN ap.articulo a " +
                        "JOIN ap.pedido p " +
                        "JOIN ap.factura f " +
                        "WHERE DATE(f.fechaPago) BETWEEN DATE(:fechaInicio) AND DATE(:fechaFin) " +
                        "AND f.fechaPago IS NOT NULL " +
                        "GROUP BY ap.articulo " +
                        "ORDER BY totalPrecio DESC")
        List<Object[]> getRankingArticulosPedidosPorFechas(@Param("fechaInicio") Date fechaInicio,
                        @Param("fechaFin") Date fechaFin);

        @Query("SELECT ap FROM ArticulosPedido ap "
                        + "WHERE (?1 IS NULL OR UPPER(ap.pedido.cliente.name) LIKE CONCAT('%', UPPER(?1), '%')) "
                        + "AND (?2 IS NULL OR UPPER(ap.articulo.nombre) LIKE CONCAT('%', UPPER(?2), '%')) "
                        + "AND ap.remito.entregado = true "
                        + "AND (ap.pedido.cliente.cuit = ?3 OR ?3 = '') "
                        + "ORDER BY ap.id DESC")
        List<ArticulosPedido> search(String cliente, String articulo, String cuit);
}