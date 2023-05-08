package com.example.hospital.repository;

import com.example.hospital.model.MedicalCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MedicalCardRepository extends JpaRepository<MedicalCard, UUID> {
    List<MedicalCard> findAllByPatientFirstNameContains(String name);
    List<MedicalCard> findAllByPatientLastNameContains(String lastName);
    List<MedicalCard> findAllByPatientIdContains(String id);
    List<MedicalCard> findAllByConditionContainingIgnoreCase(String condition);
}
