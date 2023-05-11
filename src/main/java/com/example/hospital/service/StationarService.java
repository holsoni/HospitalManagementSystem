package com.example.hospital.service;

import com.example.hospital.model.MedicalCard;
import com.example.hospital.repository.MedicalCardRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Service
public class StationarService {

    private final MedicalCardRepository medicalCardRepository;

    public List<MedicalCard> getAll(){
        return medicalCardRepository.findAll();
    }
    public List<MedicalCard> getAllByDoctorIdIs(UUID id){
        return medicalCardRepository.findAllByDoctorIdIs(id);
    }
    public List<MedicalCard> getAlByCondition(String condition){
        return medicalCardRepository.findAllByConditionContainingIgnoreCase(condition);
    }
    public List<MedicalCard> getByHospitalized(boolean value){
        return medicalCardRepository.findAllByHospitalizedIs(value);
    }
    public List<MedicalCard> getAllByName(String lastName){
        return medicalCardRepository.findAllByPatientLastNameContains(lastName);
    }
    public void delete(UUID id){
        medicalCardRepository.deleteById(id);
    }
    public void create(MedicalCard medicalCard){
        medicalCardRepository.save(medicalCard);
    }


}
