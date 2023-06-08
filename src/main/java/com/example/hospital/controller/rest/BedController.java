package com.example.hospital.controller.rest;

import com.example.hospital.model.Bed;
import com.example.hospital.model.MedicalHistory;
import com.example.hospital.service.BedService;
import com.example.hospital.service.MedicalHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/beds")
@RequiredArgsConstructor
public class BedController {

    private final BedService service;

    @GetMapping("/getAll")
    public List<Bed> getAll() {
        return service.getAll();
    }

    @GetMapping("/getAllByFreeIs")
    public List<Bed> getAllByFreeIs(@RequestParam boolean free) {
        return service.getAllByFree(free);
    }

    @GetMapping("/getById")
    public Bed getById(@RequestParam UUID id) {
        return service.getById(id);
    }

    @PostMapping("/update")
    public Bed update(@RequestBody Bed bed) {
        return service.update(bed);
    }

    @PostMapping("/create")
    public Bed create(@RequestBody Bed bed) {
       return service.create(bed);
    }
}
