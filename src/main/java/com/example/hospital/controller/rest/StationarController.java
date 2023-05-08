package com.example.hospital.controller.rest;

import com.example.hospital.model.Doctor;
import com.example.hospital.model.MedicalCard;
import com.example.hospital.model.Medications;
import com.example.hospital.model.Procedures;
import com.example.hospital.repository.MedicalCardRepository;
import com.example.hospital.repository.MedicationsRepository;
import com.example.hospital.repository.ProceduresRepository;
import com.example.hospital.service.DoctorService;
import com.example.hospital.service.StationarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200/stationar")
@RequestMapping("/stationar")
public class StationarController {
    // standard constructors

    @Autowired
   private StationarService service;

    @Autowired
    private DoctorService doctorService;


    @GetMapping("")
    public List<MedicalCard> getCards() {
        return  service.getAll();
    }

    /*@PostMapping("/addCard")
    void addCard(@RequestBody MedicalCard medicalCard) {
        service.save(medicalCard);
    }*/

   /* @PostMapping(value = "deleteCard/{id}")
    public void deleteCard(@PathVariable UUID id) {
        this.service.deleteById(id);
    }
*/


    @GetMapping("searchName")
    public List<MedicalCard> getByNameContains(@RequestParam String name) {
        return  service.getSearch(name);
    }

    @GetMapping("searchCondition")
        public List<MedicalCard> getByCondition(@RequestParam String condition) {
            return  service.getAlByCondition(condition);
        }


    @GetMapping("searchDoctor")
    public List<Doctor> getByLastNameContains( @RequestParam String lastName ) {
        System.out.println(doctorService.findAllBySurnameContains(lastName));
        return  doctorService.findAllBySurnameContains(lastName);
    }


}
