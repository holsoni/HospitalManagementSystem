package com.example.hospital.controller.rest;

import com.example.hospital.model.MedicalHistory;
import com.example.hospital.model.Treatment;
import com.example.hospital.service.MedicalHistoryService;
import com.example.hospital.service.TreatmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/treatment")
@RequiredArgsConstructor
public class TreatmentController {

    private final TreatmentService service;

    @GetMapping("/getAll")
    public List<Treatment> getAll() {
        return service.getAll();
    }

    @GetMapping("/getById")
    public Treatment getById(@RequestParam UUID id) {
        return service.getById(id);
    }




    @PostMapping("/update")
    public Treatment update(@RequestBody Treatment treatment) {
       return service.update(treatment);
    }

    @PostMapping("/create")
    public Treatment create(@RequestBody Treatment treatment) {
       return service.create(treatment);
    }
}
