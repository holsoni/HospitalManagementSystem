package com.example.hospital.service;

import com.example.hospital.model.Procedures;
import com.example.hospital.repository.ProceduresRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProcedureService {

    private ProceduresRepository repository;

    public List<Procedures> getAll(){
        return repository.findAll();
    }
    public void delete(UUID id){
        repository.deleteById(id);
    }
    public void create(Procedures procedures){
        repository.save(procedures);
    }
}
