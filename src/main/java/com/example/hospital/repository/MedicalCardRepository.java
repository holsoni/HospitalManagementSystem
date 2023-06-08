package com.example.hospital.repository;

import com.example.hospital.model.Diary;
import com.example.hospital.model.MedicalCard;
import com.example.hospital.model.MedicalHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MedicalCardRepository extends JpaRepository<MedicalCard, UUID> {
    List<MedicalCard> findAllByPatientFirstNameContains(String name);
    List<MedicalCard> findAllByPatientLastNameContains(String lastName);
    List<MedicalCard> findAllByHospitalizedIsAndTreatmentCancelledIsFalse(boolean value);
    List<MedicalCard> findAllByPatientIdContains(String id);
    List<MedicalCard> findAllByConditionContainingIgnoreCase(String condition);
    List<MedicalCard> findAllByDoctorIdIs(UUID doctor_id);
    MedicalCard findByMedicalHistoryId(UUID id);

    List<MedicalCard> findAllByTreatmentCancelledIsFalse(Pageable pageable);
    @Query("select a from MedicalCard a")

    Page<MedicalCard> findAllMedicalCards(Pageable pageable);
}
