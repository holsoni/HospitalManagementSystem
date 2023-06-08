package com.example.hospital.service;

import com.example.hospital.model.Doctor;
import com.example.hospital.repository.DoctorRepository;
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
    public Doctor getByUserId(UUID id){
        return repository.findDoctorByUserId(id);
    }

    public void delete(UUID id){
        repository.deleteById(id);
    }
    public void create(Doctor doctor){
        repository.save(doctor);
    }

    public List<Doctor> getAllBySurnameContains(String surname){
        return repository.findAllByLastNameContains(surname.toLowerCase());
    }
    public List<Doctor> getAllBySpecialization(String specialization){
        return repository.findAllBySpecializationNameContainingIgnoreCase(specialization);
    }
}
