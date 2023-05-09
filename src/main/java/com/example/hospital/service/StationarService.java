package com.example.hospital.service;

import com.example.hospital.model.MedicalCard;
import com.example.hospital.model.MedicalForm;
import com.example.hospital.repository.MedicalCardRepository;
import com.example.hospital.repository.MedicalFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class StationarService {

    @Autowired
    private MedicalCardRepository medicalCardRepository;

    public List<MedicalCard> getAll(){
        return medicalCardRepository.findAll();
    }
    public List<MedicalCard> getAlByCondition(String condition){
        return medicalCardRepository.findAllByConditionContainingIgnoreCase(condition);
    }
    public List<MedicalCard> getSearch(String lastName){
        return medicalCardRepository.findAllByPatientLastNameContains(lastName);
    }
    public void delete(UUID id){
        medicalCardRepository.deleteById(id);
    }
    public void create(MedicalCard medicalCard){
        medicalCardRepository.save(medicalCard);
    }

}