package com.example.hospital.controller.rest;

import com.example.hospital.model.Doctor;
import com.example.hospital.model.MedicalForm;
import com.example.hospital.service.DoctorService;
import com.example.hospital.service.MedicalFormService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/doctor")
public class DoctorController {
    private final MedicalFormService medicalFormService;
    private final DoctorService doctorService;

    public DoctorController(MedicalFormService MedicalFormService, DoctorService doctorService){
        this.medicalFormService = MedicalFormService;
        this.doctorService = doctorService;
    }

    @GetMapping("/getAll")
    public List<Doctor> getAll(){
        return doctorService.getAll();
    }

    @GetMapping("/getBySpecialization")
    public List<Doctor> getBySpecialization(@RequestParam String spec){
        return doctorService.getAllBySpecialization(spec);
    }
    @GetMapping("/getByLastNameContains")
    public List<Doctor> getAllBySurnameContains(@RequestParam String lastName){
        return doctorService.getAllBySurnameContains(lastName);
    }
    @GetMapping("/getByUserId")
    public Doctor getByUserId(@RequestParam UUID id){
        return doctorService.getByUserId(id);
    }

    @GetMapping("/medicalForms/getAll")
    public List<MedicalForm> getAllForms() {
        System.out.println("not found");
        return  medicalFormService.getAll();
    }

   /* @PostMapping("/patient/add")
    void addPatient(@RequestBody Patient patient) {
        service.save(patient);
    }

    @PostMapping(value = "Patient/delete/{id}")
    public void deleteProcedure(@PathVariable UUID id) {
        service.deleteById(id);
    }


    @GetMapping("/medications")
    public List<Medications> getMedications() {
        return  medicationsRepository.findAll();
    }


    @PostMapping("/medications/add")
    void addUser(@RequestBody Medications medications) {
        medicationsRepository.save(medications);
    }

    @PostMapping(value = "medications/delete/{id}")
    public void deleteMedication(@PathVariable UUID id) {
        this.medicationsRepository.deleteById(id);
    }*/


}
