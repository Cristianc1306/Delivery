
package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import unpsjb.labprog.backend.model.Domicilio;

@Service
public class DomicilioService {

    @Autowired
    DomicilioRepository repository;

    public List<Domicilio> findAll() {
        List<Domicilio> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Domicilio findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Domicilio save(Domicilio aDomicilio) {
        return repository.save(aDomicilio);
    }

    @Transactional
    public void delete(int id) {
        repository.deleteById(id);
    }
}
