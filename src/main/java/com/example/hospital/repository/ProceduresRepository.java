package com.example.hospital.repository;

import com.example.hospital.model.Procedures;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.UUID;
@Repository
public interface ProceduresRepository extends JpaRepository <Procedures, UUID> {
}
