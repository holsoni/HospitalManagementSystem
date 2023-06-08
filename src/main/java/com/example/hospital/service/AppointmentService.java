package com.example.hospital.service;

import com.example.hospital.model.Appointment;
import com.example.hospital.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    public List<Appointment> getAll() {
        List<Appointment> appointments = repository.findAll();
        return  changeStatuses(appointments);
    }

    public Appointment getById(UUID id){
        return repository.findById(id).get();
    }
    public void delete(UUID id){
        repository.deleteById(id);
    }

    public String create(Appointment appointment) {
        if (appointment.getEndTime().isBefore(LocalDateTime.now())) {
            appointment.setStatus("Заплановано");
        } else {
            appointment.setStatus("Триває");
        }
        repository.save(appointment);
        return "Прийом створено";
    }

    public List<Appointment> getAllByPatientId(UUID id, Pageable pageable){
        return repository.findAllByPatientId(id,pageable);
    }
    public List<Appointment> getAllByDoctorId(UUID id, Pageable pageable){
        return repository.findAllByDoctorUserId(id,pageable);
    }
    public int countAppointmentByPatientId(UUID id){
        return repository.countAppointmentByPatientId(id);
    }

    private List<Appointment> changeStatuses(List<Appointment> appointments) {
        LocalDateTime currentTime = LocalDateTime.now();
        for (Appointment appointment : appointments) {
            if (appointment.getEndTime().isBefore(currentTime)) {
                appointment.setStatus("Завершено");
            } else if (appointment.getStartTime().isBefore(currentTime)) {
                appointment.setStatus("Триває");
            }
            repository.save(appointment);
        }
        return appointments;
    }

}
