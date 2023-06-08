package com.example.hospital.controller.rest;

import com.example.hospital.model.Appointment;
import com.example.hospital.model.Doctor;
import com.example.hospital.model.MedicalForm;
import com.example.hospital.service.AppointmentService;
import com.example.hospital.service.DoctorService;
import com.example.hospital.service.MedicalFormService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/appointments")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping("/create")
    public String create(@RequestBody Appointment appointment){
        return appointmentService.create(appointment);
    }

    @GetMapping("/getAll")
    public List<Appointment> getAll(){
        return appointmentService.getAll();
    }

    @GetMapping("/getAllByPatientId")
    public List<Appointment> getAllByPatientId(@RequestParam UUID id,
                                               @RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "3") int size){
        Pageable paging = PageRequest.of(page, size);
        return appointmentService.getAllByPatientId(id,paging);
    }
    @GetMapping("/getAllByDoctorId")
    public List<Appointment> getAllByDoctorId(@RequestParam UUID id,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "3") int size){
        Pageable paging = PageRequest.of(page, size);
        return appointmentService.getAllByDoctorId(id,paging);
    }

    @GetMapping("/countAllByPatientId")
    public int countAllByPatientId(@RequestParam UUID id){
        return appointmentService.countAppointmentByPatientId(id);
    }





}
