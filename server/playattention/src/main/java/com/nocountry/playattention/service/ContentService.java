package com.nocountry.playattention.service;

import com.nocountry.playattention.model.Content;
import com.nocountry.playattention.model.ContentCategory;
import com.nocountry.playattention.model.ContentType;
import com.nocountry.playattention.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


 //Servicio para la gestión de contenido educativo

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;


     //Guarda un nuevo contenido

    public Content saveContent(Content content) {
        return contentRepository.save(content);
    }

    //Encuentra un contenido por su ID

    public Optional<Content> findById(Long id) {
        return contentRepository.findById(id);
    }


     //Obtiene todo el contenido

    public List<Content> findAll() {
        return contentRepository.findAll();
    }


     //Actualiza un contenido existente

    public Content updateContent(Long id, Content contentDetails) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Contenido no encontrado."));

        // Actualizar los campos del contenido
        content.setTitle(contentDetails.getTitle());
        content.setDescription(contentDetails.getDescription());
        content.setFilePath(contentDetails.getFilePath());
        content.setThumbnailPath(contentDetails.getThumbnailPath());
        content.setContentType(contentDetails.getContentType());
        content.setCategory(contentDetails.getCategory());
        content.setActive(contentDetails.isActive());
        content.setLanguageCode(contentDetails.getLanguageCode());
        content.setOriginalContentId(contentDetails.getOriginalContentId());

        return contentRepository.save(content);
    }


     // Actualiza el estado de activación de un contenido

    public Content updateContentActiveStatus(Long id, boolean active) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Contenido no encontrado."));

        content.setActive(active);
        return contentRepository.save(content);
    }


     // Elimina un contenido

    public void deleteContent(Long id) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Contenido no encontrado."));

        contentRepository.delete(content);
    }


     //Busca contenido por tipo

    public List<Content> findByContentType(ContentType contentType) {
        return contentRepository.findByContentType(contentType);
    }


     // Busca contenido por categoría

    public List<Content> findByCategory(ContentCategory category) {
        return contentRepository.findByCategory(category);
    }


     // Busca contenido por estado de activación

    public List<Content> findByActive(boolean active) {
        return contentRepository.findByActive(active);
    }


     // Busca contenido por título

    public List<Content> findByTitleContaining(String title) {
        return contentRepository.findByTitleContaining(title);
    }


     // Busca contenido por código de idioma

    public List<Content> findByLanguageCode(String languageCode) {
        return contentRepository.findByLanguageCode(languageCode);
    }


     // Busca contenido por ID de contenido original (para traducciones)

    public List<Content> findByOriginalContentId(Long originalContentId) {
        return contentRepository.findByOriginalContentId(originalContentId);
    }


     //Busca contenido por tipo y categoría

    public List<Content> findByContentTypeAndCategory(ContentType contentType, ContentCategory category) {
        return contentRepository.findByContentTypeAndCategory(contentType, category);
    }
}