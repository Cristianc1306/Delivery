package unpsjb.labprog.backend.business;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.DTOs.FacturaDTO;
import unpsjb.labprog.backend.DTOs.PedidoDTO;
import unpsjb.labprog.backend.DTOs.RankingArticulosPedidosDTO;
import unpsjb.labprog.backend.DTOs.RemitoDTO;
import unpsjb.labprog.backend.model.Articulo;
import unpsjb.labprog.backend.model.ArticulosPedido;
import unpsjb.labprog.backend.model.Pedido;
import unpsjb.labprog.backend.model.Remito;
import unpsjb.labprog.backend.model.Factura;

@Service
public class ArticulosPedidoService {

  @Autowired
  ArticulosPedidoRepository repository;

  public List<ArticulosPedido> findAll() {
    List<ArticulosPedido> result = new ArrayList<>();
    repository.findAll().forEach(e -> result.add(e));
    return result;
  }

  public ArticulosPedido findById(int id) {
    return repository.findById(id).orElse(null);
  }

  @Transactional
  public ArticulosPedido save(ArticulosPedido aArticulosPedido) {
    return repository.save(aArticulosPedido);
  }

  @Transactional
  public void delete(int id) {
    repository.deleteById(id);
  }

  public List<ArticulosPedido> findByPedido(Pedido pedido) {
    return repository.findByPedido(pedido);
  }

  public List<ArticulosPedido> findByRemito(Remito remito) {
    return repository.findByRemito(remito);
  }

  public List<ArticulosPedido> findByFactura(Factura factura) {
    return repository.findByFactura(factura);
  }

  public List<ArticulosPedido> findArticulosPedidoSinRemitos(Date fecha) {
    return repository.findArticulosPedidoSinRemitos(fecha);
  }

  public List<ArticulosPedido> findArticulosPedidoEntregado() {
    return repository.findArticulosPedidoEntregado();
  }

  public Double calcularTotal(List<ArticulosPedido> articulosPedidos) {
    double total = 0.0;
    for (ArticulosPedido articulo : articulosPedidos) {
      total += articulo.getPrecio();
    }
    DecimalFormat df = new DecimalFormat("#.##");
    return Double.parseDouble(df.format(total));
  }

  public boolean verificarArticulosPedidoConRemito(List<ArticulosPedido> articulosPedidos) {
    return articulosPedidos.stream().allMatch(ap -> ap.getRemito() != null);
  }

  public List<ArticulosPedido> search(String cliente, String articulo, String cuit) {
    return repository.search("%" + cliente + "%", "%" + articulo + "%", cuit);
  }

  public Page<ArticulosPedido> FindByPage(List<ArticulosPedido> articulosPedidos, int page, int size) {
    int start = page * size;
    int end = Math.min(start + size, articulosPedidos.size());
    Page<ArticulosPedido> articulosPedidosPage = new PageImpl<>(articulosPedidos.subList(start, end),
        PageRequest.of(page, size), articulosPedidos.size());
    return articulosPedidosPage;
  }

  public Page<RemitoDTO> getRemitosPage(List<RemitoDTO> remitosDTO, int page, int size) {

    int start = page * size;
    int end = Math.min(start + size, remitosDTO.size());
    Page<RemitoDTO> remitosPage = new PageImpl<>(remitosDTO.subList(start, end), PageRequest.of(page, size),
        remitosDTO.size());
    return remitosPage;
  }

  public List<RemitoDTO> getRemitos(List<Remito> remitos) {
    List<RemitoDTO> remitosDTO = new ArrayList<>();
    for (Remito r : remitos) {
      remitosDTO.add(new RemitoDTO(r, calcularTotal(findByRemito(r)), findByRemito(r)));
    }
    return remitosDTO;
  }

  public Page<FacturaDTO> getFacturasPage(List<FacturaDTO> facturasDTO, int page, int size) {

    int start = page * size;
    int end = Math.min(start + size, facturasDTO.size());
    Page<FacturaDTO> facturasPage = new PageImpl<>(facturasDTO.subList(start, end), PageRequest.of(page, size),
        facturasDTO.size());
    return facturasPage;
  }

  public List<FacturaDTO> getFacturas(List<Factura> facturas) {
    List<FacturaDTO> facturasDTO = new ArrayList<>();
    for (Factura r : facturas) {
      facturasDTO.add(new FacturaDTO(r, calcularTotal(findByFactura(r)), findByFactura(r)));
    }
    return facturasDTO;
  }

  public Page<PedidoDTO> getPedidos(List<Pedido> pedidos, int page, int size) {
    List<PedidoDTO> pedidosDTO = new ArrayList<>();
    for (Pedido r : pedidos) {
      pedidosDTO.add(
          new PedidoDTO(r, calcularTotal(findByPedido(r)), verificarArticulosPedidoConRemito(findByPedido(r)), null));
    }
    int start = page * size;
    int end = Math.min(start + size, pedidosDTO.size());
    Page<PedidoDTO> pedidosPage = new PageImpl<>(pedidosDTO.subList(start, end), PageRequest.of(page, size),
        pedidosDTO.size());
    return pedidosPage;
  }

  public Page<RankingArticulosPedidosDTO> getRankingArticulosPedidosPorFechas(Date fechaInicio, Date fechaFin, int page,
      int size) {
    List<Object[]> resultados = repository.getRankingArticulosPedidosPorFechas(fechaInicio, fechaFin);
    List<RankingArticulosPedidosDTO> ranking = new ArrayList<>();

    for (Object[] resultado : resultados) {
      Articulo articulo = (Articulo) resultado[0];
      Double total = (Double) resultado[1];
      Long cantidadPedida = (Long) resultado[2];
      RankingArticulosPedidosDTO dto = new RankingArticulosPedidosDTO(articulo, total.doubleValue(),
          cantidadPedida.intValue());
      ranking.add(dto);
    }

    int start = page * size;
    int end = Math.min(start + size, ranking.size());
    List<RankingArticulosPedidosDTO> rankingPageList = ranking.subList(start, end);

    return new PageImpl<>(rankingPageList, PageRequest.of(page, size), ranking.size());
  }

}