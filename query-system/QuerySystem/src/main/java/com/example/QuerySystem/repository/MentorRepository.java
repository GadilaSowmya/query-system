package com.example.QuerySystem.repository;

import com.example.QuerySystem.entity.Mentor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MentorRepository extends JpaRepository<Mentor, String> {

    Optional<Mentor> findByEmail(String email);
}
