package com.nocountry.playattention.service;


import com.nocountry.playattention.dto.lead.RequestCreateLeadDTO;
import com.nocountry.playattention.mappers.LeadMapper;
import com.nocountry.playattention.model.Lead;
import com.nocountry.playattention.model.LeadStatus;
import com.nocountry.playattention.model.UserType;
import com.nocountry.playattention.repository.LeadRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

 // Servicio para la gestión de leads

@Service
@RequiredArgsConstructor
public class LeadService {

    private final LeadRepository leadRepository;

    private final LeadMapper leadMapper;

     // Guarda un nuevo lead

    public Lead saveLead(RequestCreateLeadDTO leadDTO) {
        // Asegurar que el lead tenga un estado inicial
        Lead lead = leadMapper.mapToEntity(leadDTO);

        if (lead.getStatus() == null) {
            lead.setStatus(LeadStatus.NEW);
        }
        return leadRepository.save(lead);
    }


     // Encuentra un lead por su ID

    public Optional<Lead> findById(Long id) {
        return leadRepository.findById(id);
    }


     // Obtiene todos los leads

    public List<Lead> findAll() {
        return leadRepository.findAll();
    }


     // Actualiza un lead existente

    public Lead updateLead(Long id, Lead leadDetails) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Lead no encontrado."));

        // Actualizar los campos del lead
        lead.setName(leadDetails.getName());
        lead.setLastName(leadDetails.getLastName());
        lead.setEmail(leadDetails.getEmail());
        lead.setInstitution(leadDetails.getInstitution());
        lead.setPhoneNumber(leadDetails.getPhoneNumber());
        lead.setProfession(leadDetails.getProfession());
        lead.setTargetUsers(leadDetails.getTargetUsers());
        lead.setNewsletterSubscription(leadDetails.isNewsletterSubscription());
        lead.setUsageContext(leadDetails.getUsageContext());
        lead.setLeadType(leadDetails.getLeadType());
        lead.setStatus(leadDetails.getStatus());
        lead.setNotes(leadDetails.getNotes());

        return leadRepository.save(lead);
    }


     // Actualiza el estado de un lead

    public Lead updateLeadStatus(Long id, LeadStatus status) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Lead no encontrado."));

        lead.setStatus(status);
        return leadRepository.save(lead);
    }


     // Elimina un lead

    public void deleteLead(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Lead no encontrado."));

        leadRepository.delete(lead);
    }


     // Busca leads por tipo

    public List<Lead> findByLeadType(UserType leadType) {
        return leadRepository.findByLeadType(leadType);
    }


     // Busca leads por estado

    public List<Lead> findByStatus(LeadStatus status) {
        return leadRepository.findByStatus(status);
    }


     // Busca leads creados en un rango de fechas

    public List<Lead> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end) {
        return leadRepository.findByCreatedAtBetween(start, end);
    }


     // Busca leads por email

    public List<Lead> findByEmailContaining(String email) {
        return leadRepository.findByEmailContaining(email);
    }


     // Busca leads por nombre

    public List<Lead> findByFullNameContaining(String name) {
        return leadRepository.findByNameContaining(name);
    }


     // Busca leads por institución

    public List<Lead> findByInstitutionContaining(String institution) {
        return leadRepository.findByInstitutionContaining(institution);
    }
}