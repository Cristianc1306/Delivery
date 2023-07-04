
package unpsjb.labprog.backend.presenter;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.DomicilioService;

import unpsjb.labprog.backend.model.Domicilio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("domicilios")
public class DomicilioPresenter {

  @Autowired
  DomicilioService service;

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<Object> findAll() {
    return Response.ok(service.findAll());
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<Object> creat(@RequestBody Domicilio aDomicilio) {

    return Response.ok(
        service.save(aDomicilio),
        " creado correctamente");
  }

  @RequestMapping(method = RequestMethod.PUT)
  public ResponseEntity<Object> update(@RequestBody Domicilio aDomicilio) {

    return Response.ok(
        service.save(aDomicilio),
        " creado correctamente");
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<Object> deleteF(@PathVariable("id") int id) {
    Domicilio domicilio = service.findById(id);
    if (domicilio == null) {
      return Response.notFound("domiclio no existe");
    }

    service.delete(domicilio.getId());

    return Response.ok("domicilio eliminado correctamente");
  }
}
