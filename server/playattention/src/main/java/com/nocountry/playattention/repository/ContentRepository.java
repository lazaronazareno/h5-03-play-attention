package com.nocountry.playattention.repository;


import com.nocountry.playattention.model.Content;
import com.nocountry.playattention.model.ContentCategory;
import com.nocountry.playattention.model.ContentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findByContentType(ContentType contentType);

    List<Content> findByCategory(ContentCategory category);

    List<Content> findByActive(boolean active);

    List<Content> findByTitleContaining(String title);

    List<Content> findByLanguageCode(String languageCode);

    List<Content> findByOriginalContentId(Long originalContentId);

    List<Content> findByContentTypeAndCategory(ContentType contentType, ContentCategory category);
}