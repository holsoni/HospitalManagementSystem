package com.example.hospital.repository;

import com.example.hospital.model.Medications;
import com.example.hospital.model.Procedures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MedicationsRepository extends JpaRepository <Medications, UUID> {
     List<Medications> findAllByName(String name);
     List<Medications> findAllByNameContains(String name);
}
