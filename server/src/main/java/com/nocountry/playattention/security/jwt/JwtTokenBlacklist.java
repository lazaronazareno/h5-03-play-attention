package com.nocountry.playattention.security.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

// Clase que gestiona la lista negra de tokens JWT
// Utiliza Redis y MySQL para almacenar tokens invalidados

@Component
public class JwtTokenBlacklist {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenBlacklist.class);

    @Autowired
    private RedisTokenService redisTokenService;



    // Añade un token a la lista negra

     // Añade un token a la lista negra

    @CacheEvict(value = "tokenBlacklist", key = "#token")
    @Transactional
    public void addToBlacklist(String token, long expiryTimeInMillis) {
        try {
            redisTokenService.addToBlacklist(token, expiryTimeInMillis);
            logger.info("Token añadido a la lista negra en Redis y MySQL");
        } catch (Exception e) {
            logger.error("Error al añadir token a la lista negra: {}", e.getMessage());
        }
    }


     // Verifica si un token está en la lista negra

    @Cacheable(value = "tokenBlacklist", key = "#token", unless = "#result == false")
    public boolean isBlacklisted(String token) {
        try {
            return redisTokenService.isBlacklisted(token);
        } catch (Exception e) {
            logger.error("Error al verificar token en la lista negra: {}", e.getMessage());
            return false;
        }
    }


     // Limpia los tokens expirados de la lista negra
     // Se ejecuta automáticamente cada día

    @Scheduled(cron = "0 0 0 * * ?") // Ejecutar a medianoche todos los días
    @CacheEvict(value = "tokenBlacklist", allEntries = true)
    @Transactional
    public void cleanupExpiredTokens() {
        try {
            redisTokenService.cleanupExpiredTokens();
            logger.info("Se limpiaron tokens expirados de Redis y MySQL");
        } catch (Exception e) {
            logger.error("Error al limpiar tokens expirados: {}", e.getMessage());
        }
    }
}