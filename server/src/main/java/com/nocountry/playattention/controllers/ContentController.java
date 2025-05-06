package com.nocountry.playattention.controllers;

import com.nocountry.playattention.model.Content;
import com.nocountry.playattention.model.ContentCategory;
import com.nocountry.playattention.model.ContentType;
import com.nocountry.playattention.payload.response.MessageResponse;
import com.nocountry.playattention.security.services.UserDetailsImpl;
import com.nocountry.playattention.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;


 // Controlador para la gestión de contenido educativo

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/content")
public class ContentController {

    @Autowired
    private ContentService contentService;


     // Crea un nuevo contenido (solo para administradores)

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> createContent(@Valid @RequestBody Content content) {
        // Establecer el usuario que crea el contenido
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        content.setCreatedBy(userDetails.getId());

        contentService.saveContent(content);
        return ResponseEntity.ok(new MessageResponse("Contenido creado exitosamente",""));
    }


    // Obtiene el contenido activo (acceso público)

    @GetMapping("/public")
    public ResponseEntity<List<Content>> getAllPublicContent() {
        List<Content> contents = contentService.findByActive(true);
        return ResponseEntity.ok(contents);
    }


    // Obtiene el contenido completo (solo para administradores)

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<Content>> getAllContent() {
        List<Content> contents = contentService.findAll();
        return ResponseEntity.ok(contents);
    }


     // Obtiene un contenido por su ID

    @GetMapping("/{id}")
    public ResponseEntity<?> getContentById(@PathVariable Long id) {
        Content content = contentService.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Contenido no encontrado."));

        // Verificar si el contenido es público o si el usuario es administrador
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_SUPER_ADMIN"));

        if (!content.isActive() && !isAdmin) {
            return ResponseEntity.status(403).body(new MessageResponse("No tiene acceso a este contenido",""));
        }

        return ResponseEntity.ok(content);
    }


     // Actualiza un contenido (solo para administradores)

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateContent(@PathVariable Long id, @RequestBody Content contentDetails) {
        Content updatedContent = contentService.updateContent(id, contentDetails);
        return ResponseEntity.ok(updatedContent);
    }


     // Actualiza el estado de activación de un contenido (solo para administradores)

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateContentStatus(@PathVariable Long id, @RequestParam boolean active) {
        contentService.updateContentActiveStatus(id, active);
        return ResponseEntity.ok(new MessageResponse("Estado del contenido actualizado exitosamente",""));
    }


     // Elimina un contenido (solo para administradores)

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> deleteContent(@PathVariable Long id) {
        contentService.deleteContent(id);
        return ResponseEntity.ok(new MessageResponse("Contenido eliminado exitosamente",""));
    }


     // Busca contenido por tipo

    @GetMapping("/by-type/{contentType}")
    public ResponseEntity<List<Content>> getContentByType(@PathVariable ContentType contentType) {
        List<Content> contents = contentService.findByContentType(contentType);
        // Filtrar contenido inactivo para usuarios no administradores
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_SUPER_ADMIN"));

        if (!isAdmin) {
            contents = contents.stream()
                    .filter(Content::isActive)
                    .toList();
        }

        return ResponseEntity.ok(contents);
    }


     // Busca contenido por categoría

    @GetMapping("/by-category/{category}")
    public ResponseEntity<List<Content>> getContentByCategory(@PathVariable ContentCategory category) {
        List<Content> contents = contentService.findByCategory(category);
        // Filtrar contenido inactivo para usuarios no administradores
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_SUPER_ADMIN"));

        if (!isAdmin) {
            contents = contents.stream()
                    .filter(Content::isActive)
                    .toList();
        }

        return ResponseEntity.ok(contents);
    }


     // Busca contenido por título

    @GetMapping("/search/title")
    public ResponseEntity<List<Content>> searchContentByTitle(@RequestParam String title) {
        List<Content> contents = contentService.findByTitleContaining(title);
        // Filtrar contenido inactivo para usuarios no administradores
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_SUPER_ADMIN"));

        if (!isAdmin) {
            contents = contents.stream()
                    .filter(Content::isActive)
                    .toList();
        }

        return ResponseEntity.ok(contents);
    }


     //Busca contenido por idioma

    @GetMapping("/by-language/{languageCode}")
    public ResponseEntity<List<Content>> getContentByLanguage(@PathVariable String languageCode) {
        List<Content> contents = contentService.findByLanguageCode(languageCode);
        // Filtrar contenido inactivo para usuarios no administradores
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_SUPER_ADMIN"));

        if (!isAdmin) {
            contents = contents.stream()
                    .filter(Content::isActive)
                    .toList();
        }

        return ResponseEntity.ok(contents);
    }


     // Busca contenido por tipo y categoría

    @GetMapping("/by-type-and-category")
    public ResponseEntity<List<Content>> getContentByTypeAndCategory(
            @RequestParam ContentType contentType,
            @RequestParam ContentCategory category) {
        List<Content> contents = contentService.findByContentTypeAndCategory(contentType, category);
        // Filtrar contenido inactivo para usuarios no administradores
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || a.getAuthority().equals("ROLE_SUPER_ADMIN"));

        if (!isAdmin) {
            contents = contents.stream()
                    .filter(Content::isActive)
                    .toList();
        }

        return ResponseEntity.ok(contents);
    }
}