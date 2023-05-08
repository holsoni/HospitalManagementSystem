package com.example.hospital.controller.rest;

import com.example.hospital.model.Medications;
import com.example.hospital.model.Procedures;
import com.example.hospital.repository.MedicationsRepository;
import com.example.hospital.repository.ProceduresRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200/catalog")
@RequestMapping("/catalog")
public class ServicesController {
    // standard constructors

    public ServicesController(ProceduresRepository proceduresRepository, MedicationsRepository medicationsRepository) {
        this.proceduresRepository = proceduresRepository;
        this.medicationsRepository = medicationsRepository;
    }
    private final ProceduresRepository proceduresRepository;
    private final MedicationsRepository medicationsRepository;



    @GetMapping("/procedures")
    public List<Procedures> getProcedures() {
        return  proceduresRepository.findAll();
    }

    @PostMapping("/procedures/add")
    void addProcedure(@RequestBody Procedures procedures) {
        proceduresRepository.save(procedures);
    }

    @PostMapping(value = "procedures/delete/{id}")
    public void deleteProcedure(@PathVariable UUID id) {
        this.proceduresRepository.deleteById(id);
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
    }


    @GetMapping("/medications/{name}")
    public List<Medications> getByNameContains(@PathVariable String name) {
        return  medicationsRepository.findAllByNameContains(name);
    }


}
