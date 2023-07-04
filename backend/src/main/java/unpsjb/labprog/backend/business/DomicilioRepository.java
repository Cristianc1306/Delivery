
package unpsjb.labprog.backend.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Domicilio;

@Repository
public interface DomicilioRepository extends CrudRepository<Domicilio, Integer> {

}
