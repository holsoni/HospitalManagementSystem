package com.example.hospital.service;

import com.example.hospital.model.Treatment;
import com.example.hospital.repository.TreatmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TreatmentService {

    @Autowired
    private TreatmentRepository repository;

    public List<Treatment> getAll(){
        return repository.findAll();
    }
    public Treatment getById(UUID id){
        return repository.findById(id).orElse(null);
    }
    public void delete(UUID id){
        repository.deleteById(id);
    }
    public Treatment create(Treatment treatment){
        return repository.save(treatment);
    }
    public Treatment update(Treatment treatment){
        return repository.save(treatment);
    }

}
