package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.ClienteService;
import unpsjb.labprog.backend.model.Cliente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import unpsjb.labprog.backend.business.DomicilioService;

@RestController
@RequestMapping("clientes")
public class ClientePresenter {

  @Autowired
  ClienteService service;
  @Autowired
  DomicilioService domicilioService;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
  public ResponseEntity<Object> findById(@PathVariable("id") int id) {
    Cliente aClienteOrNull = service.findById(id);
    return (aClienteOrNull != null) ? Response.ok(aClienteOrNull) : Response.notFound();
  }

  @RequestMapping(value = "/{cuit}", method = RequestMethod.GET)
  public ResponseEntity<Object> findByCode(@PathVariable("cuit") String cuit) {
    Cliente aClienteOrNull = service.findByCode(cuit);
    return (aClienteOrNull != null) ? Response.ok(aClienteOrNull, "Cliente recuperado correctamente")
        : Response.notFound("Cliente no existe");
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> update(@RequestBody Cliente aCliente) {

    if (aCliente.getFechaDeBaja() != null) {
      aCliente.setFechaDeBaja(null);
    }
    return Response.ok(
        service.save(aCliente),
        "Cliente actualizado correctamente");
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> creat(@RequestBody Cliente aCliente) {

    return Response.ok(
        service.save(aCliente),
        "cliente creado correctamente");
  }

  @RequestMapping(value = "/{cuit}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> delete(@PathVariable("cuit") String cuit,
      @RequestParam(value = "fecha", required = false) String fecha) throws ParseException {
    Cliente cliente = service.findByCode(cuit);
    if (cliente == null) {
      return Response.notFound("Cliente no existe");
    }
    // Cambiar el borrador lógico del cliente
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Date date = formatter.parse(fecha);
    cliente.setFechaDeBaja(date);

    return Response.ok(service.save(cliente), "Cliente eliminado correctamente");
  }

  @RequestMapping(value = "/f/{cuit}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteF(@PathVariable("cuit") String cuit) {
    Cliente cliente = service.findByCode(cuit);
    if (cliente == null) {
      return Response.notFound("Cliente no existe");
    }

    service.delete(cliente.getId());

    return Response.ok("Cliente eliminado correctamente");
  }

  @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
  public ResponseEntity<Object> search(@PathVariable("term") String term) {
    return Response.ok(service.search(term));
  }

  @RequestMapping(value = "/search/activos/{term}", method = RequestMethod.GET)
  public ResponseEntity<Object> searchClientesActivos(@PathVariable("term") String term) {
    return Response.ok(service.searchClientesActivos(term));
  }

  @RequestMapping(value = "/search", method = RequestMethod.GET)
  public ResponseEntity<Object> search(
      @RequestParam(value = "term", required = false) String term,
      @RequestParam(value = "fecha", required = false) String fecha,
      @RequestParam(value = "cuit", required = false) String cuit,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size

  ) throws ParseException {

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    Date date = formatter.parse(fecha);

    return Response.ok(service.FindByPage(service.searchHistorialClientes(term, date, cuit), page, size));
  }

  @RequestMapping(value = "/cuentacorriente", method = RequestMethod.GET)
  public ResponseEntity<Object> getDeudaClientes(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size

  ) {
    return Response.ok(service.getDeudaClientes(page, size));
  }
}