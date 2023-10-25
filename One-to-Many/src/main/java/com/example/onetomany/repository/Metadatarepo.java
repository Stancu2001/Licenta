package com.example.onetomany.repository;

import com.example.onetomany.entity.Metadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Metadatarepo extends JpaRepository<Metadata,Long> {
    List<Metadata> findByoriginalFileNameContaining(String originalFileName);
}
