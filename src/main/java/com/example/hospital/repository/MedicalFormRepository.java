package com.example.hospital.repository;

import com.example.hospital.model.MedicalForm;
import com.example.hospital.model.Medications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MedicalFormRepository extends JpaRepository <MedicalForm, UUID> {
     List<MedicalForm> findAll();
     List<MedicalForm> findAllBySpecializationsContaining(String specialization_name);
}
