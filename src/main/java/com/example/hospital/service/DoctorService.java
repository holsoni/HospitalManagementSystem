package com.example.hospital.service;

import com.example.hospital.model.Doctor;
import com.example.hospital.model.Patient;
import com.example.hospital.repository.DoctorRepository;
import com.example.hospital.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository repository;

    public List<Doctor> getAll(){
        return repository.findAll();
    }
    public void delete(UUID id){
        repository.deleteById(id);
    }
    public void create(Doctor doctor){
        repository.save(doctor);
    }

    public List<Doctor> findAllBySurnameContains(String surname){
        return repository.findAllBySurnameContains(surname);
    }
}
