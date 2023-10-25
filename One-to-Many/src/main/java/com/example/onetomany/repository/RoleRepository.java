package com.example.onetomany.repository;

import java.util.Optional;

import com.example.onetomany.entity.ERole;
import com.example.onetomany.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}

