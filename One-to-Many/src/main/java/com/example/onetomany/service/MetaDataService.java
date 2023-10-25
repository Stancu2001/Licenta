package com.example.onetomany.service;

import com.example.onetomany.entity.Metadata;
import com.example.onetomany.repository.Metadatarepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetaDataService {
    private final Metadatarepo metadatarepo;
    @Autowired
    public MetaDataService(Metadatarepo metadatarepo) {
        this.metadatarepo = metadatarepo;
    }
    public List<Metadata> getAllFile() {
        return metadatarepo.findAll();
    }
    public void saveMetadata(Metadata metadata) {
        metadatarepo.save(metadata);
    }
    public List<Metadata> findByOriginalFileNameContaining(String fileName) {
        return metadatarepo.findByoriginalFileNameContaining(fileName);
    }
}
