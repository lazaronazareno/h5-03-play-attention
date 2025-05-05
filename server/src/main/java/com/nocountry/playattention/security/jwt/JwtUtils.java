package com.nocountry.playattention.security.jwt;

import com.nocountry.playattention.security.services.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.security.InvalidKeyException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;

 // Utilidad para manejar operaciones con JWT

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpirationMs;

    @Autowired
    private JwtTokenValidator tokenValidator;


     // Genera un token JWT a partir de la autenticación

    public String generateJwtToken(Authentication authentication) {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        Key key = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(jwtSecret));

        return this.generateJwtToken(userPrincipal.getUsername());
    }

    public String generateJwtToken(String username) {
        SecretKey key = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(jwtSecret));
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key)
                .compact();
    }


     // Obtiene el nombre de usuario del token JWT

    public String getUserNameFromJwtToken(String token) {
        Key key = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(jwtSecret));
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }


     // Valida el token JWT

    public boolean validateJwtToken(String authToken) {
        // Primero verificamos si el token está en la lista negra usando el validador
        if (!tokenValidator.validateToken(authToken)) {
            logger.error("Token JWT en lista negra o inválido");
            return false;
        }

        try {
            Key key = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(jwtSecret));
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Firma JWT inválida: {}", e.getMessage());
            return false;
        } catch (Exception e) {
            logger.error("Error al validar el token JWT: {}", e.getMessage());
            return false;
        }
    }

     // Obtiene la fecha de expiración del token JWT

    public Date getExpirationDateFromJwtToken(String token) {
        try {
            try {
            Key key = Keys.hmacShaKeyFor(java.util.Base64.getDecoder().decode(jwtSecret));
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getExpiration();
        } catch (SignatureException | InvalidKeyException e) {
            logger.error("Error de seguridad al procesar el token JWT: {}", e.getMessage());
            return null;
        } catch (Exception e) {
            logger.error("Error inesperado al procesar el token JWT: {}", e.getMessage());
            return null;
        }
        } catch (Exception e) {
            logger.error("Error al obtener la fecha de expiración del token: {}", e.getMessage());
            return null;
        }
    }


     // Invalida un token JWT añadiéndolo a la lista negra

    public void invalidateToken(String token) {
        Date expirationDate = getExpirationDateFromJwtToken(token);
        if (expirationDate != null) {
            tokenValidator.invalidateToken(token, expirationDate.getTime());
            logger.info("Token invalidado y añadido a la lista negra");
        }
    }


     // Extrae el token JWT del encabezado de autorización

    public String extractTokenFromBearer(String bearerToken) {
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}