package com.example.hospital.controller.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
@RequestMapping("/card")
@RequiredArgsConstructor
public class CardController {
/*    private final CardService cardService;

    @GetMapping("/getAll")
    public List<MedicalCard> getAll(){
        return cardService.getAll();
    }

    @GetMapping("/getById")
    public MedicalCard getAll(@RequestParam UUID id){
        return cardService.getById(id);
    }

    @PostMapping("/update")
    public void update(@RequestBody MedicalCard card){
        cardService.update(card);
    }*/

}
