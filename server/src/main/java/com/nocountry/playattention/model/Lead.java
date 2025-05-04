package com.nocountry.playattention.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
    @Size(max = 50)
    private String name;

    private String lastName;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    private String institution;

    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private ComplementTreatment complementTreatment;

    private String profession;

    @Column(name = "target_users")
    private String targetUsers; // Quién lo va a usar (niños, adolescentes, adultos, etc.)

    private boolean newsletterSubscription;

    @Column(name = "usage_context", length = 500)
    private String usageContext; // Contexto de uso

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;

    @Enumerated(EnumType.STRING)
    private LeadStatus status;

    @Enumerated(EnumType.STRING)
    private UserType leadType;

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