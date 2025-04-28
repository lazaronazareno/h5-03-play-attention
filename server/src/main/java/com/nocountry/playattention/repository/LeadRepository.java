package com.nocountry.playattention.repository;

import com.nocountry.playattention.model.Lead;
import com.nocountry.playattention.model.LeadStatus;
import com.nocountry.playattention.model.UserType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    List<Lead> findByLeadType(UserType leadType);

    List<Lead> findByStatus(LeadStatus status);

    List<Lead> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    List<Lead> findByEmailContaining(String email);

    List<Lead> findByNameContaining(String name);

    List<Lead> findByInstitutionContaining(String institution);
}