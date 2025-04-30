package com.nocountry.playattention.security.jwt;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
    @Query("DELETE FROM BlacklistedToken b WHERE b.expiryDate < ?1")
    int deleteAllExpiredTokens(Date now);
}