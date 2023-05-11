package com.example.hospital.controller.rest;

import com.example.hospital.model.Medications;
import com.example.hospital.model.Patient;
import com.example.hospital.model.Patient;
import com.example.hospital.repository.MedicationsRepository;
import com.example.hospital.repository.PatientRepository;
import com.example.hospital.repository.PatientRepository;
import com.example.hospital.service.PatientService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200/patients")
@RequestMapping("/patients")
public class PatientsController {
    private final PatientService service;

    public PatientsController(PatientService service){
        this.service = service;
    }

    @GetMapping("/search/{phone}")
    public List<Patient> getPatientByPhone(@PathVariable String phone) {
        return  service.findAllByPhone(phone);
    }
    @GetMapping("/getById")
    public Patient getPatientByPhone(@RequestParam UUID id) {
        return  service.getById(id);
    }
    @GetMapping("/advancedSearch")
    public List<Patient> getPatientAdvanced(        @RequestParam(name = "firstName") String firstName,
                                                    @RequestParam(name = "lastName") String lastName,
                                                    @RequestParam(name = "dateOfBirth") String dateOfBirth) {

        return  service.findAllByNameAndBirth(firstName,lastName,dateOfBirth);
    }

    @GetMapping()
    public List<Patient> getAll(){
       service.getAll().forEach(System.out::println);
        return service.getAll();
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
