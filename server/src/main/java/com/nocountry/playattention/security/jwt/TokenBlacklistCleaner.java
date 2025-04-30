package com.nocountry.playattention.security.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


 // Programador de tareas para limpiar periódicamente los tokens expirados de la lista negra

@Component
@EnableScheduling
public class TokenBlacklistCleaner {
    private static final Logger logger = LoggerFactory.getLogger(TokenBlacklistCleaner.class);

    @Autowired
    private JwtTokenBlacklist tokenBlacklist;


     // Limpia los tokens expirados cada hora
     // La expresión cron "0 0 * * * ?" significa: ejecutar al minuto 0 de cada hora

    @Scheduled(cron = "0 0 * * * ?")
    public void cleanupExpiredTokens() {
        logger.info("Iniciando limpieza de tokens expirados en la lista negra");
        tokenBlacklist.cleanupExpiredTokens();
        logger.info("Limpieza de tokens expirados completada");
    }
}