package com.example.hospital.controller.rest;

import com.example.hospital.model.MedicalHistory;
import com.example.hospital.service.MedicalHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/history")
@RequiredArgsConstructor
public class MedicalHistoryController {

    private final MedicalHistoryService medicalHistoryService;

    @GetMapping("/getAll")
    public List<MedicalHistory> getAll() {
        return medicalHistoryService.getAll();
    }

    @GetMapping("/getById")
    public MedicalHistory getById(@RequestParam String id) {
        UUID id1 = UUID.randomUUID();
        return medicalHistoryService.getById(id1);
    }


    @PostMapping("/update")
    public void update(@RequestBody MedicalHistory history) {
        medicalHistoryService.update(history);
    }

    @PostMapping("/addHistory")
    public MedicalHistory create(@RequestBody MedicalHistory history) {
       return medicalHistoryService.create(history);
    }
}
