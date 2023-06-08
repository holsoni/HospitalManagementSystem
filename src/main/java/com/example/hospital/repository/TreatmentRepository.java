package com.example.hospital.repository;

import com.example.hospital.model.Diary;
import com.example.hospital.model.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, UUID> {

}
