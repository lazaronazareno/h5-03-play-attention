package com.nocountry.playattention.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

// Servicio para gestionar la lista negra de tokens JWT

@Service
public class RedisTokenService {
    private static final String CACHE_NAME = "tokenBlacklist";

    @Autowired
    private BlacklistedTokenRepository tokenRepository;


     // Agrega un token a la lista negra en Redis y MySQL

    @Transactional
    public void addToBlacklist(String token, long expiryTimeInMillis) {
        // Añadir a Redis con TTL
        // El token se almacenará en Redis durante 7 días
        // No necesitamos implementar esto explícitamente ya que Spring Cache lo maneja automáticamente

        // Persistir en MySQL
        BlackListedToken blacklistedToken = new BlackListedToken(token, new Date(expiryTimeInMillis));
        tokenRepository.save(blacklistedToken);
    }


     // Verifica si un token está en la lista negra
     // Primero busca en Redis, si no está presente busca en MySQL

    @Cacheable(value = CACHE_NAME, key = "#token", unless = "#result == false")
    public boolean isBlacklisted(String token) {
        // Primero busca en Redis (manejado automáticamente por Spring Cache)
        // Si no encuentra en Redis, buscará en MySQL
        return tokenRepository.existsByTokenValue(token);
    }

    
     // Elimina un token de la lista negra
     
    @CacheEvict(value = CACHE_NAME, key = "#token")
    public void removeFromBlacklist(String token) {
        tokenRepository.deleteByTokenValue(token);
    }

    
     // Limpia los tokens expirados de Redis y MySQL
     
    @Transactional
    public void cleanupExpiredTokens() {
        // Spring Cache maneja automáticamente la limpieza de Redis basada en TTL
        // Solo necesitamos limpiar los tokens expirados de MySQL
        tokenRepository.deleteAllExpiredTokens(new Date());
    }
}
