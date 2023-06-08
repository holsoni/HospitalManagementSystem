package com.example.hospital.repository;

import com.example.hospital.model.Bed;
import com.example.hospital.model.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BedRepository extends JpaRepository<Bed, UUID> {
    List<Bed> getAllByFreeIs(boolean free);
}
