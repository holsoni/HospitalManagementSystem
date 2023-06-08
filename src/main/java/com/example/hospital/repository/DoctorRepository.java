package com.example.hospital.repository;

import com.example.hospital.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    List<Doctor> findAllByFirstNameContainsAndLastNameContains(String name, String lastname);
    List<Doctor> findAllByLastNameContains( String lastname);

    List<Doctor> findAllBySpecializationNameContainingIgnoreCase(String specialization);
    Doctor findDoctorByUserId(UUID id);
}
