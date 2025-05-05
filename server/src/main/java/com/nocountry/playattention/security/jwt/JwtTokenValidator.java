package com.nocountry.playattention.security.jwt;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


 // Clase que valida tokens JWT y verifica si están en la lista negra.
 // Esta clase es utilizada en conjunto con JWTUtils
 // La validación de firma y expiración se realiza en JwtUtils
 // Esta clase solo verifica si el token está en la lista negra

@Component
public class JwtTokenValidator {

    @Autowired
    private JwtTokenBlacklist tokenBlacklist;


     // Valida si un token JWT es válido y no está en la lista negra

    public boolean validateToken(String token) {

        if (tokenBlacklist.isBlacklisted(token)) {
            return false;
        }

        return true;
    }


     // Invalida un token JWT añadiéndolo a la lista negra

    public void invalidateToken(String token, long expiryTimeInMillis) {
        tokenBlacklist.addToBlacklist(token, expiryTimeInMillis);
    }
}