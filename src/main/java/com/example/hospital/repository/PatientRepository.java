package com.example.hospital.repository;

import com.example.hospital.model.Medications;
import com.example.hospital.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PatientRepository extends JpaRepository <Patient, UUID> {
     List<Patient> findAllByPhone(String phone);
     List<Patient> findAllByFirstNameContainsIgnoreCaseAndLastNameContainsIgnoreCaseAndDateOfBirthIs
             (String firstName, String lastName, String dateOfBirth);

}
