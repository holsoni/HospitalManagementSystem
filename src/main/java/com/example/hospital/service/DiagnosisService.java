package com.example.hospital.service;

import com.example.hospital.model.Diagnosis;
import com.example.hospital.model.Diary;
import com.example.hospital.repository.DiagnosisRepository;
import com.example.hospital.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DiagnosisService {

    @Autowired
    private DiagnosisRepository repository;

    public List<Diagnosis> getAll(){
        return repository.findAll();
    }


}
