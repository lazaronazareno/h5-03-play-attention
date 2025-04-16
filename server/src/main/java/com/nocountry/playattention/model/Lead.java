package com.nocountry.playattention.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "leads")
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String fullName;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private String institution;

    private String phoneNumber;

    private String profession;

    @Column(name = "target_users")
    private String targetUsers; // Quién lo va a usar (niños, adolescentes, adultos, etc.)

    private boolean newsletterSubscription;

    @Column(name = "usage_context", length = 500)
    private String usageContext; // Contexto de uso

    @Enumerated(EnumType.STRING)
    private UserType leadType; // Tipo de lead (PROFESSIONAL, INDIVIDUAL, CORPORATE)

    @Enumerated(EnumType.STRING)
    private LeadStatus status; // Estado del lead en el pipeline

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @Column(name = "notes", length = 1000)
    private String notes; // Notas de seguimiento

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
        if (status == null) {
            status = LeadStatus.NEW;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }
}