package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.ArticulosPedidoService;
import unpsjb.labprog.backend.model.ArticulosPedido;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import java.util.Date;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("articulospedidos")
public class ArticulosPedidoPresenter {

  @Autowired
  ArticulosPedidoService service;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> creat(@RequestBody ArticulosPedido articulosPedidos) {

    return Response.ok(
        service.save(articulosPedidos),
        " creado correctamente");
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> update(@RequestBody ArticulosPedido articulosPedidos) {

    if (articulosPedidos.getId() == 0) {
      return Response.error(
          " articulos Pedido actualizado no correctamente");
    }
    return Response.ok(
        service.save(articulosPedidos),
        "articulos Pedido actualizado correctamente");
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> delete(@PathVariable("id") int id) {

    service.delete(id);
    return Response.ok("articulo pedido eliminado correctamente");
  }

  @RequestMapping(value = "/sinremito/{fecha}", method = RequestMethod.GET)
  public ResponseEntity<Object> findArticulosPedidoSinRemitos(@PathVariable("fecha") String fecha)
      throws ParseException {
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Date date = formatter.parse(fecha);
    List<ArticulosPedido> articulosPedido = service.findArticulosPedidoSinRemitos(date);
    return Response.ok(articulosPedido);
  }

  @RequestMapping(value = "/entregados", method = RequestMethod.GET)
  public ResponseEntity<Object> findArticulosPedidoEntregado() {

    List<ArticulosPedido> articulosPedido = service.findArticulosPedidoEntregado();
    return Response.ok(articulosPedido);
  }

  @RequestMapping(value = "/search", method = RequestMethod.GET)
  public ResponseEntity<Object> search(
      @RequestParam(value = "cliente", required = false) String cliente,
      @RequestParam(value = "cuit", required = false) String cuit,
      @RequestParam(value = "articulo", required = false) String articulo,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size

  ) {

    return Response.ok(service.FindByPage(service.search(cliente, articulo, cuit), page, size));
  }

  @RequestMapping(value = "/ranking", method = RequestMethod.GET)
  public ResponseEntity<Object> search(
      @RequestParam(value = "fechaInicio", required = false) String fechaInicio,
      @RequestParam(value = "fechaFin", required = false) String fechaFin,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size

  ) throws ParseException {

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Date date = formatter.parse(fechaInicio);
    Date date1 = formatter.parse(fechaFin);

    return Response.ok(service.getRankingArticulosPedidosPorFechas(date, date1, page, size));
  }

}