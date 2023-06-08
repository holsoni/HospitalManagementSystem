package com.example.hospital.service;

import com.example.hospital.model.*;
import com.example.hospital.repository.DiaryRepository;
import com.example.hospital.repository.MedicalCardRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class StationarService {

    @Autowired
    private  MedicalCardRepository medicalCardRepository;

    @Autowired
    private DiaryRepository diaryRepository;

    public Page<MedicalCard> getAll(Pageable pageable){
        return medicalCardRepository.findAllMedicalCards(pageable);
    }
    public List<MedicalCard> getAllCurrentTreatment( Pageable pageable){
        return medicalCardRepository.findAllByTreatmentCancelledIsFalse(pageable);
    }
    public List<MedicalCard> getAllByDoctorIdIs(UUID id){
        return medicalCardRepository.findAllByDoctorIdIs(id);
    }
    public MedicalCard getById(UUID id){
        return medicalCardRepository.findById(id).orElse(null);
    }
    public List<MedicalCard> getAlByCondition(String condition){
        return medicalCardRepository.findAllByConditionContainingIgnoreCase(condition);
    }
    public List<MedicalCard> getByHospitalized(boolean value){
        return medicalCardRepository.findAllByHospitalizedIsAndTreatmentCancelledIsFalse(value);
    }
    public List<MedicalCard> getAllByName(String lastName){
        return medicalCardRepository.findAllByPatientLastNameContains(lastName);
    }
    public void delete(UUID id){
        medicalCardRepository.deleteById(id);
    }
    public MedicalCard create(MedicalCard medicalCard){

       return medicalCardRepository.save(medicalCard);
    }
    public Diary createDiary(Diary diary){
        return diaryRepository.save(diary);
    }
    public MedicalCard update(MedicalCard medicalCard){
     /*   if(medicalCard.getMedicalHistory().getDiagnosis() != null &&
                medicalCard.getMedicalHistory().getSymptoms() != null &&
                medicalCard.getMedicalHistory().getTreatmentResult() != null &&
                medicalCard.getMedicalHistory().getTreatment() != null){
            medicalCard.setHistoryFilled(true);
        }*/
        medicalCard.setUpdatedAt(Date.valueOf(LocalDate.now()));
        return medicalCardRepository.save(medicalCard);
    }


    public void updateFilledHistory(UUID id,boolean value){
        MedicalCard card = getById(id);
        card.setHistoryFilled(value);
        medicalCardRepository.save(card);
    }

    public void endTreatment(UUID id,boolean value){
        MedicalCard card = getById(id);
        card.setTreatmentCancelled(value);
        card.setTreatmentCancelledDate(Date.valueOf(LocalDate.now()));
        card.getBed().setFree(true);
        medicalCardRepository.save(card);
    }
    public MedicalCard getByMedicalHistoryId(UUID id){
        return medicalCardRepository.findByMedicalHistoryId(id);
    }



}
