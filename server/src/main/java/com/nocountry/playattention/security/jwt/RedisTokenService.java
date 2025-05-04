package com.nocountry.playattention.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Date;
import java.util.Set;

// Servicio para gestionar la lista negra de tokens JWT

@Service
public class RedisTokenService {
    private static final String CACHE_NAME = "tokenBlacklist";

    @Autowired
    private BlacklistedTokenRepository tokenRepository;

    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(RedisTokenService.class);

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    // Agrega un token a la lista negra en Redis y MySQL

    @Transactional
    public void addToBlacklist(String token, long expiryTimeInMillis) {
        try {
            // Añadir a Redis con TTL
            redisTemplate.opsForValue().set("token:" + token, token,
                    Duration.ofMillis(expiryTimeInMillis));

            // Persistir en MySQL
            BlackListedToken blacklistedToken = new BlackListedToken(token, new Date(expiryTimeInMillis));
            tokenRepository.save(blacklistedToken);

        logger.info("Añadiendo token a la lista negra: {}", token);

        } catch (Exception e) {
            logger.error("Error al añadir token a la lista negra: {}", e.getMessage());
            throw e;
        }

    }

    @Cacheable(value = CACHE_NAME, key = "#token", unless = "#result == false")
    public boolean isBlacklisted(String token) {
        try {
            // Primero busca en Redis
            Object cachedToken = redisTemplate.opsForValue().get("token:" + token);
            if (cachedToken != null) {
                return true;
            }

            // Si no está en Redis, buscar en MySQL
            return tokenRepository.existsByTokenValue(token);
        } catch (Exception e) {
            logger.error("Error al verificar token en la lista negra: {}", e.getMessage());
            return false;
        }
    }

    
     // Elimina un token de la lista negra
     
    @CacheEvict(value = CACHE_NAME, key = "#token")
    public void removeFromBlacklist(String token) {
        try {
            // Eliminar de Redis
            redisTemplate.delete("token:" + token);
            // Eliminar de MySQL
            tokenRepository.deleteByTokenValue(token);
        } catch (Exception e) {
            logger.error("Error al eliminar token de la lista negra: {}", e.getMessage());
            throw e;
        }
    }
     // Limpia los tokens expirados de Redis y MySQL

    @Transactional
    public void cleanupExpiredTokens() {
        try {
            // Limpiar tokens expirados de Redis
            Set<String> keys = redisTemplate.keys("token:*");
            if (keys != null) {
                redisTemplate.delete(keys);
            }

            // Limpiar tokens expirados de MySQL
            tokenRepository.deleteAllExpiredTokens(new Date());
        } catch (Exception e) {
            logger.error("Error al limpiar tokens expirados: {}", e.getMessage());
            throw e;
        }
    }
}
