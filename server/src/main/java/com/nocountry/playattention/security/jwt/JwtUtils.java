package com.nocountry.playattention.security.jwt;

import com.nocountry.playattention.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private JwtTokenBlacklist tokenBlacklist;

    @Autowired
    private JwtTokenValidator tokenValidator;


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
        // Primero verificamos si el token está en la lista negra usando el validador
        if (!tokenValidator.validateToken(authToken)) {
            logger.error("Token JWT en lista negra o inválido");
            return false;
        }

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

     // Obtiene la fecha de expiración del token JWT

    public Date getExpirationDateFromJwtToken(String token) {
        try {
            return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getExpiration();
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