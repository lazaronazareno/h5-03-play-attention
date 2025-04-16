package com.nocountry.playattention.controllers;


import com.nocountry.playattention.model.Lead;
import com.nocountry.playattention.model.LeadStatus;
import com.nocountry.playattention.model.UserType;
import com.nocountry.playattention.payload.response.MessageResponse;
import com.nocountry.playattention.service.LeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Controlador para la gestión de leads
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/leads")
public class LeadController {

    @Autowired
    private LeadService leadService;

    /**
     * Crea un nuevo lead (acceso público para formularios de contacto)
     */
    @PostMapping
    public ResponseEntity<?> createLead(@Valid @RequestBody Lead lead) {
        Lead savedLead = leadService.saveLead(lead);
        return ResponseEntity.ok(new MessageResponse("Lead registrado exitosamente"));
    }

    /**
     * Obtiene todos los leads (solo para administradores y profesionales)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<List<Lead>> getAllLeads() {
        List<Lead> leads = leadService.findAll();
        return ResponseEntity.ok(leads);
    }

    /**
     * Obtiene un lead por su ID (solo para administradores y profesionales)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<?> getLeadById(@PathVariable Long id) {
        Lead lead = leadService.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Lead no encontrado."));
        return ResponseEntity.ok(lead);
    }

    /**
     * Actualiza un lead (solo para administradores y profesionales)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<?> updateLead(@PathVariable Long id, @RequestBody Lead leadDetails) {
        Lead updatedLead = leadService.updateLead(id, leadDetails);
        return ResponseEntity.ok(new MessageResponse("Lead actualizado exitosamente"));
    }

    /**
     * Actualiza el estado de un lead (solo para administradores y profesionales)
     */
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<?> updateLeadStatus(@PathVariable Long id, @RequestParam LeadStatus status) {
        Lead updatedLead = leadService.updateLeadStatus(id, status);
        return ResponseEntity.ok(new MessageResponse("Estado del lead actualizado exitosamente"));
    }

    /**
     * Elimina un lead (solo para administradores)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.ok(new MessageResponse("Lead eliminado exitosamente"));
    }

    /**
     * Busca leads por tipo (solo para administradores y profesionales)
     */
    @GetMapping("/by-type/{leadType}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<List<Lead>> getLeadsByType(@PathVariable UserType leadType) {
        List<Lead> leads = leadService.findByLeadType(leadType);
        return ResponseEntity.ok(leads);
    }

    /**
     * Busca leads por estado (solo para administradores y profesionales)
     */
    @GetMapping("/by-status/{status}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<List<Lead>> getLeadsByStatus(@PathVariable LeadStatus status) {
        List<Lead> leads = leadService.findByStatus(status);
        return ResponseEntity.ok(leads);
    }

    /**
     * Busca leads por rango de fechas (solo para administradores y profesionales)
     */
    @GetMapping("/by-date-range")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<List<Lead>> getLeadsByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<Lead> leads = leadService.findByCreatedAtBetween(start, end);
        return ResponseEntity.ok(leads);
    }

    /**
     * Busca leads por email (solo para administradores y profesionales)
     */
    @GetMapping("/search/email")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<List<Lead>> searchLeadsByEmail(@RequestParam String email) {
        List<Lead> leads = leadService.findByEmailContaining(email);
        return ResponseEntity.ok(leads);
    }

    /**
     * Busca leads por nombre (solo para administradores y profesionales)
     */
    @GetMapping("/search/name")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<List<Lead>> searchLeadsByName(@RequestParam String name) {
        List<Lead> leads = leadService.findByFullNameContaining(name);
        return ResponseEntity.ok(leads);
    }

    /**
     * Busca leads por institución (solo para administradores y profesionales)
     */
    @GetMapping("/search/institution")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN') or hasRole('PROFESSIONAL')")
    public ResponseEntity<List<Lead>> searchLeadsByInstitution(@RequestParam String institution) {
        List<Lead> leads = leadService.findByInstitutionContaining(institution);
        return ResponseEntity.ok(leads);
    }
}