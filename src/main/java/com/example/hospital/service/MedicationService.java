package com.example.hospital.service;

import com.example.hospital.model.Medications;
import com.example.hospital.model.Procedures;
import com.example.hospital.repository.MedicationsRepository;
import com.example.hospital.repository.ProceduresRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MedicationService {


    private MedicationsRepository repository;

    public List<Medications> getAll(){
        return repository.findAll();
    }
    public void delete(UUID id){
        repository.deleteById(id);
    }
    public void create(Medications medications){
        repository.save(medications);
    }
    public List<Medications> findByName(String name){
        return repository.findAllByName(name);
    }
}
