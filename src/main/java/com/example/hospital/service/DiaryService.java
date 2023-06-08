package com.example.hospital.service;

import com.example.hospital.model.Diary;
import com.example.hospital.model.MedicalForm;
import com.example.hospital.repository.DiaryRepository;
import com.example.hospital.repository.MedicalFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DiaryService {

    @Autowired
    private DiaryRepository repository;

    public List<Diary> getAll(){
        return repository.findAll();
    }
    public void delete(UUID id){
        repository.deleteById(id);
    }
    public void create(Diary diary){
        repository.save(diary);
    }

}
