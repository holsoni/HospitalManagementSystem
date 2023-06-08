package com.example.hospital.repository;

import com.example.hospital.model.Appointment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository <Appointment, UUID> {
     List<Appointment> findAllByPatientId(UUID patientId, Pageable pageable);
     List<Appointment> findAllByDoctorUserId(UUID userId, Pageable pageable);
     int countAppointmentByPatientId(UUID patientId);

}
