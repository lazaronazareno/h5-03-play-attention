package com.nocountry.playattention.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "contents")
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String title;

    @Column(length = 500)
    private String description;

    @Column(name = "file_path")
    private String filePath; // Ruta al archivo (documento, video, etc.)

    @Column(name = "thumbnail_path")
    private String thumbnailPath; // Ruta a la miniatura (para videos)

    @Enumerated(EnumType.STRING)
    private ContentType contentType; // Tipo de contenido

    @Enumerated(EnumType.STRING)
    private ContentCategory category; // Categoría del contenido

    private boolean active; // Si el contenido está activo/visible

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    @Column(name = "created_by")
    private Long createdBy; // ID del usuario que creó el contenido

    @Column(name = "language_code", length = 10)
    private String languageCode; // Código del idioma (es, en, etc.)

    @Column(name = "original_content_id")
    private Long originalContentId; // Para contenido traducido, referencia al original

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        lastUpdated = LocalDateTime.now();
        if (active == false) {
            active = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        lastUpdated = LocalDateTime.now();
    }
}