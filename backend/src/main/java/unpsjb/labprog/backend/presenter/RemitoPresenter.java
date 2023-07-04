package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.DTOs.RemitoDTO;
import unpsjb.labprog.backend.business.RemitoService;
import unpsjb.labprog.backend.model.Remito;
import unpsjb.labprog.backend.business.ArticulosPedidoService;
import unpsjb.labprog.backend.business.ProcesoService;
import java.util.Date;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("remitos")
public class RemitoPresenter {

  @Autowired
  RemitoService service;
  @Autowired
  ArticulosPedidoService articuloPedidoService;
  @Autowired
  ProcesoService procesoService;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> creat(@RequestBody Remito remito) {
    return Response.ok(
        service.save(remito),
        "remito cargado con éxito");
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> delete(@PathVariable("id") int id) {

    service.delete(id);
    return Response.ok(" remito eliminado correctamente");
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    Remito aRemitoorNull = service.findById(id);
    return (aRemitoorNull != null) ? Response.ok(new RemitoDTO(aRemitoorNull,
        articuloPedidoService.calcularTotal(articuloPedidoService.findByRemito(aRemitoorNull)),
        articuloPedidoService.findByRemito(aRemitoorNull))) : Response.notFound();
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> update(@RequestBody Remito remito) {

    if (remito.getId() == 0) {
      return Response.error(
          " remito actualizado no correctamente");
    }
    return Response.ok(
        service.save(remito),
        "Remito entregado correctamente");
  }

  @RequestMapping(value = "/search", method = RequestMethod.GET)
  public ResponseEntity<Object> search(
      @RequestParam(value = "term", required = false) String term,
      @RequestParam(value = "entregado", required = false) String entregado,
      @RequestParam(value = "fecha", required = false) String fecha,
      @RequestParam(value = "facturado", required = false) String facturado,
      @RequestParam(value = "cuit", required = false) String cuit,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size

  ) throws ParseException {
    Boolean estadoEntregado = null;
    if (entregado != null && !entregado.isEmpty()) {
      estadoEntregado = Boolean.valueOf(entregado);
    }
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Date date = formatter.parse(fecha);

    return Response.ok(articuloPedidoService.getRemitosPage(
        articuloPedidoService.getRemitos(service.search(term, estadoEntregado, date, facturado, cuit)), page, size));
  }

  @RequestMapping(value = "/generar", method = RequestMethod.GET)
  public ResponseEntity<Object> generarRemitos(
      @RequestParam(value = "fecha", required = false) String fecha) throws ParseException {

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Date date = formatter.parse(fecha);

    return Response.ok(articuloPedidoService.getRemitos(procesoService.generarRemitos(date)));
  }

}