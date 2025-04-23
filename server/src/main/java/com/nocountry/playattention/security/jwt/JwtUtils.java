package com.nocountry.playattention.security.jwt;

import com.nocountry.playattention.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;


 // Utilidad para manejar operaciones con JWT

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpirationMs;


     // Genera un token JWT a partir de la autenticación

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        SecretKey key = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(jwtSecret));

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }


     // Obtiene el nombre de usuario del token JWT

    public String getUserNameFromJwtToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(jwtSecret));
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }


     // Valida el token JWT

    public boolean validateJwtToken(String authToken) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(jwtSecret));
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(authToken);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            logger.error("Firma JWT inválida: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("Token JWT expirado: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Token JWT no soportado: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("La cadena claims JWT está vacía: {}", e.getMessage());
        }

        return false;
    }
}