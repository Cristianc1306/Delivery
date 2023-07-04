package unpsjb.labprog.backend.business;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.Localidad;

@Service
public class LocalidadService {
    @Autowired
    LocalidadRepository repository;

    public List<Localidad> search(String term) {
        return repository.search("%" + term + "%");
    }
}
