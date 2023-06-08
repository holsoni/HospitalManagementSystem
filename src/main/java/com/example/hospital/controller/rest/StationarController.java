package com.example.hospital.controller.rest;

import com.example.hospital.model.*;
import com.example.hospital.service.DiagnosisService;
import com.example.hospital.service.DiaryService;
import com.example.hospital.service.DoctorService;
import com.example.hospital.service.StationarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/stationar")
public class StationarController {
    // standard constructors

    @Autowired
   private StationarService service;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private DiaryService diaryService;

    @Autowired
    private DiagnosisService diagnosisService;

    @GetMapping("")
    public Page<MedicalCard> getCards(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "3") int size) {
        Pageable paging = PageRequest.of(page,size);
        return  service.getAll(paging);
    }
    @GetMapping("/getAllCurrentTreatment")
    public List<MedicalCard> getAllByPatientId(
                                               @RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "3") int size){
        Pageable paging = PageRequest.of(page, size);
        return service.getAllCurrentTreatment(paging);
    }
    @GetMapping("/getHospitalized")
    public List<MedicalCard> getAllNotHospitalized(@RequestParam boolean value) {
        return  service.getByHospitalized(value);
    }

    @GetMapping("/getById")
    public MedicalCard getAll(@RequestParam UUID id){
        return service.getById(id);
    }
    @GetMapping("/diagnosis/getAll")
    public List<Diagnosis> getAll(){
        return diagnosisService.getAll();
    }

    @PostMapping("/addCard")
    public MedicalCard addCard(@RequestBody MedicalCard medicalCard) {
        System.out.println(medicalCard.toString());
        return service.create(medicalCard);

    }
    @PostMapping("/addDiary")
    public Diary addDiary(@RequestBody Diary diary) {

        return service.createDiary(diary);

    }
    @PostMapping("/update")
    public MedicalCard update(@RequestBody MedicalCard medicalCard) {
        return service.update(medicalCard);

    }
    @PostMapping("/updateFilledHistory")
    public void updateFilledHistory(@RequestParam UUID id, @RequestParam boolean value) {
         service.updateFilledHistory(id,value);
    }
    @PostMapping("/updateCancelTreatment")
    public void endTreatment(@RequestParam UUID id, @RequestParam boolean value) {
         service.endTreatment(id,value);
    }


    @DeleteMapping("/deleteCard")
    public void deleteCard(@RequestParam  UUID id) {
        this.service.delete(id);
    }


    @GetMapping("searchName")
    public List<MedicalCard> getByNameContains(@RequestParam String name) {
        return  service.getAllByName(name);
    }
    @GetMapping("getAllByDoctorId")
    public List<MedicalCard> getAllByDoctorIdIs(@RequestParam UUID id) {
        return  service.getAllByDoctorIdIs(id);
    }

    @GetMapping("searchCondition")
        public List<MedicalCard> getByCondition(@RequestParam String condition) {
            return  service.getAlByCondition(condition);
        }


    @GetMapping("searchDoctor")
    public List<Doctor> getByLastNameContains( @RequestParam String lastName ) {
        System.out.println(doctorService.getAllBySurnameContains(lastName));
        return  doctorService.getAllBySurnameContains(lastName);
    }

    @GetMapping("/getByMedicalHistoryId")
    public MedicalCard getByMedicalHistoryId(@RequestParam UUID id) {
        return service.getByMedicalHistoryId(id);
    }

/*    @GetMapping("/getDiariesForMedicalCard")
    public List<Diary> getDiariesForMedicalCard(@RequestParam UUID id){
        return service.getAllForMedicalCa
    }*/

}
