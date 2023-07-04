package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.DTOs.PedidoDTO;
import unpsjb.labprog.backend.business.PedidoService;
import unpsjb.labprog.backend.business.ArticulosPedidoService;
import unpsjb.labprog.backend.model.Pedido;
import unpsjb.labprog.backend.model.ArticulosPedido;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("pedidos")
public class PedidoPresenter {

  @Autowired
  PedidoService service;
  @Autowired
  ArticulosPedidoService articuloPedidoService;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> creat(@RequestBody PedidoDTO pedidoDTO) {

    Pedido pedido = new Pedido();
    pedido.setCliente(pedidoDTO.getCliente());
    pedido.setDomicilio(pedidoDTO.getDomicilio());
    pedido.setObservaciones(pedidoDTO.getObservaciones());
    pedido.setFecha(pedidoDTO.getFecha());
    pedido = service.save(pedido);

    for (ArticulosPedido articulosPedido : pedidoDTO.getArticulosPedido()) {
      articulosPedido.setPedido(pedido);
      articuloPedidoService.save(articulosPedido);
    }

    return Response.ok(
        pedido,
        "Pedido cargado con éxito");
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> delete(@PathVariable("id") int id) {

    service.delete(id);
    return Response.ok(" pedido eliminado correctamente");
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    Pedido aPedidoorNull = service.findById(id);
    return (aPedidoorNull != null) ? Response.ok(new PedidoDTO(aPedidoorNull,
        articuloPedidoService.calcularTotal(articuloPedidoService.findByPedido(aPedidoorNull)), null,
        articuloPedidoService.findByPedido(aPedidoorNull))) : Response.notFound();
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> update(@RequestBody Pedido pedido) {

    if (pedido.getId() == 0) {
      return Response.error(
          " pedido actualizado no correctamente");
    }
    return Response.ok(
        service.save(pedido),
        "Pedido actualizado correctamente");
  }

  @RequestMapping(value = "/search", method = RequestMethod.GET)
  public ResponseEntity<Object> search(
      @RequestParam(value = "term", required = false) String term,
      @RequestParam(value = "fecha", required = false) String fecha,
      @RequestParam(value = "estado", required = false) String estado,
      @RequestParam(value = "cuit", required = false) String cuit,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size

  ) throws ParseException {

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Date date = formatter.parse(fecha);

    return Response.ok(articuloPedidoService.getPedidos(service.search(term, date, estado, cuit), page, size));
  }

}
