package com.nocountry.playattention.security.jwt;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.Optional;

// Repositorio para acceder a los tokens invalidados almacenados en la base de datos

@Repository
public interface BlacklistedTokenRepository extends JpaRepository<BlackListedToken, Long> {

    //Busca un token por su valor

    Optional<BlackListedToken> findByTokenValue(String tokenValue);

    // Verifica si un token existe en la lista negra

    boolean existsByTokenValue(String tokenValue);

    // Elimina todos los tokens expirados

    @Modifying
    @Query("DELETE FROM BlackListedToken b WHERE b.expiryDate < :expiryDate")
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    void deleteAllExpiredTokens(@Param("expiryDate") Date expiryDate);

    // Elimina un token específico
    @Modifying
    @Query("DELETE FROM BlackListedToken b WHERE b.tokenValue = :tokenValue")
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    void deleteByTokenValue(@Param("tokenValue") String tokenValue);
}