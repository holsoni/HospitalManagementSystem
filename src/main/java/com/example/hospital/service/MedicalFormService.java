package com.example.hospital.service;

import com.example.hospital.model.MedicalForm;
import com.example.hospital.model.Patient;
import com.example.hospital.repository.MedicalFormRepository;
import com.example.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MedicalFormService {

    @Autowired
    private MedicalFormRepository repository;

    public List<MedicalForm> getAll(){
        return repository.findAll();
    }
    public void delete(UUID id){
        repository.deleteById(id);
    }
    public void create(MedicalForm MedicalForm){
        repository.save(MedicalForm);
    }

}
