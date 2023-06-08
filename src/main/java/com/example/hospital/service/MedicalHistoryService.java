package com.example.hospital.service;

import com.example.hospital.model.MedicalCard;
import com.example.hospital.model.MedicalHistory;
import com.example.hospital.repository.MedicalHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MedicalHistoryService {

    @Autowired
    private MedicalHistoryRepository repository;

    public List<MedicalHistory> getAll(){
        return repository.findAll();
    }

    public MedicalHistory getById(UUID id){
        return repository.findById(id).orElse(null);
    }

    public void delete(UUID id){
        repository.deleteById(id);
    }
    public MedicalHistory create(MedicalHistory history){
        return repository.save(history);
    }

    public void update(MedicalHistory history) {
        repository.save(history);
    }


}
