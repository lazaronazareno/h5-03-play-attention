package com.nocountry.playattention.security.jwt;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


 // Clase que gestiona la lista negra de tokens JWT
 //Almacena los tokens invalidados en MySQL para persistencia y en Redis para caché distribuida

@Component
public class JwtTokenBlacklist {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenBlacklist.class);

    // Mantenemos el mapa en memoria como caché local para consultas rápidas
    // Sincronizará con la base de datos y Redis
    private final Map<String, Long> localTokenCache = new ConcurrentHashMap<>();

    @Autowired
    private BlacklistedTokenRepository tokenRepository;


     // Añade un token a la lista negra

    @CacheEvict(value = "tokenBlacklist", key = "#token")
    @Transactional
    public void addToBlacklist(String token, long expiryTimeInMillis) {
        // Añadir a la caché local
        localTokenCache.put(token, expiryTimeInMillis);

        // Persistir en la base de datos
        try {
            BlackListedToken blacklistedToken = new BlackListedToken(token, new Date(expiryTimeInMillis));
            tokenRepository.save(blacklistedToken);
            logger.info("Token añadido a la lista negra y persistido en la base de datos");
        } catch (Exception e) {
            logger.error("Error al persistir token en la base de datos: {}", e.getMessage());
        }
    }


     // Verifica si un token está en la lista negra

    @Cacheable(value = "tokenBlacklist", key = "#token", unless = "#result == false")
    public boolean isBlacklisted(String token) {
        // Primero verificamos en la caché local para respuesta rápida
        if (localTokenCache.containsKey(token)) {
            return true;
        }

        // Si no está en la caché local, verificamos en la base de datos
        try {
            boolean exists = tokenRepository.existsByTokenValue(token);
            if (exists) {
                // Si existe en la base de datos pero no en la caché local, lo añadimos a la caché
                tokenRepository.findByTokenValue(token).ifPresent(blacklistedToken ->
                        localTokenCache.put(token, blacklistedToken.getExpiryDate().getTime()));
            }
            return exists;
        } catch (Exception e) {
            logger.error("Error al verificar token en la base de datos: {}", e.getMessage());
            return false;
        }
    }


     // Limpia los tokens expirados de la lista negra
     // Se ejecuta automáticamente cada día

    @Scheduled(cron = "0 0 0 * * ?") // Ejecutar a medianoche todos los días
    @CacheEvict(value = "tokenBlacklist", allEntries = true)
    @Transactional
    public void cleanupExpiredTokens() {
        long currentTimeMillis = System.currentTimeMillis();

        // Limpiar caché local
        localTokenCache.entrySet().removeIf(entry -> entry.getValue() < currentTimeMillis);

        // Limpiar base de datos
        try {
            int deletedCount = tokenRepository.deleteAllExpiredTokens(new Date());
            logger.info("Se eliminaron {} tokens expirados de la base de datos", deletedCount);
        } catch (Exception e) {
            logger.error("Error al limpiar tokens expirados de la base de datos: {}", e.getMessage());
        }
    }
}