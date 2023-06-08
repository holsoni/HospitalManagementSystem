package com.example.hospital.service;

import com.example.hospital.model.Bed;
import com.example.hospital.model.Diary;
import com.example.hospital.repository.BedRepository;
import com.example.hospital.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BedService {

    @Autowired
    private BedRepository repository;

    public List<Bed> getAll(){
        return repository.findAll();
    }
    public Bed getById(UUID id){
        return repository.findById(id).orElse(null);
    }
    public List<Bed> getAllByFree(boolean free){
        return repository.getAllByFreeIs(free);
    }
    public void delete(UUID id){
         repository.deleteById(id);
    }
    public Bed create(Bed bed){
        return  repository.save(bed);
    }
    public Bed update(Bed bed){
        return  repository.save(bed);
    }

}
