package com.example.hospital.service;

import com.example.hospital.model.Medications;
import com.example.hospital.model.Patient;
import com.example.hospital.repository.MedicationsRepository;
import com.example.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PatientService {

    @Autowired
    private PatientRepository repository;

    public List<Patient> getAll(){
        return repository.findAll();
    }
    public void delete(UUID id){
        repository.deleteById(id);
    }
    public void create(Patient patient){
        repository.save(patient);
    }

    public List<Patient> findAllByPhone(String phone){
        return repository.findAllByPhone(phone);
    }
    public List<Patient> findAllByNameAndBirth(String firstName, String lastName, String dateOfBirth){

        return repository.findAllByFirstNameContainsIgnoreCaseAndLastNameContainsIgnoreCaseAndDateOfBirthIs(firstName,lastName,dateOfBirth);
    }
}
