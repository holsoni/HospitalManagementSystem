package com.example.hospital.repository;

import com.example.hospital.model.Diagnosis;
import com.example.hospital.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, UUID> {

}
