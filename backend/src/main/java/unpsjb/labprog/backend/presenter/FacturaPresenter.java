package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.DTOs.FacturaDTO;
import unpsjb.labprog.backend.business.FacturaService;
import unpsjb.labprog.backend.business.ProcesoService;
import unpsjb.labprog.backend.model.Factura;
import unpsjb.labprog.backend.business.ArticulosPedidoService;
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
@RequestMapping("facturas")
public class FacturaPresenter {

  @Autowired
  FacturaService service;
  @Autowired
  ArticulosPedidoService articuloPedidoService;
  @Autowired
  ProcesoService procesoService;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> creat(@RequestBody Factura factura) {

    return Response.ok(
        service.save(factura),
        "factura cargado con éxito");
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> delete(@PathVariable("id") int id) {

    service.delete(id);
    return Response.ok(" factura eliminado correctamente");
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    Factura aFacturaorNull = service.findById(id);
    return (aFacturaorNull != null) ? Response.ok(new FacturaDTO(aFacturaorNull,
        articuloPedidoService.calcularTotal(articuloPedidoService.findByFactura(aFacturaorNull)),
        articuloPedidoService.findByFactura(aFacturaorNull))) : Response.notFound();
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> update(@RequestBody Factura factura) {

    if (factura.getId() == 0) {
      return Response.error(
          " factura actualizado no correctamente");
    }
    return Response.ok(
        service.save(factura),
        "Factura abonada correctamente");
  }

  @RequestMapping(value = "/vendido", method = RequestMethod.GET)
  public ResponseEntity<Object> vendido(
      @RequestParam(value = "fechaInicio", required = false) String fechaInicio,
      @RequestParam(value = "fechaFin", required = false) String fechaFin,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size

  ) throws ParseException {

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Date date = formatter.parse(fechaInicio);
    Date date1 = formatter.parse(fechaFin);

    return Response.ok(service.vendido(date, date1, page, size));
  }

  @RequestMapping(value = "/search", method = RequestMethod.GET)
  public ResponseEntity<Object> search(
      @RequestParam(value = "term", required = false) String term,
      @RequestParam(value = "fecha", required = false) String fecha,
      @RequestParam(value = "pagado", required = false) String pagado,
      @RequestParam(value = "cuit", required = false) String cuit,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size

  ) throws ParseException {

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Date date = formatter.parse(fecha);

    return Response.ok(articuloPedidoService
        .getFacturasPage(articuloPedidoService.getFacturas(service.search(term, date, pagado, cuit)), page, size));
  }

  @RequestMapping(value = "/generar", method = RequestMethod.GET)
  public ResponseEntity<Object> generarFacturas() {

    return Response.ok(articuloPedidoService.getFacturas(procesoService.generarFacturas()));
  }

}