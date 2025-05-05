package com.nocountry.playattention.security.jwt;

import com.nocountry.playattention.config.TokenCacheKeyGenerator;
import org.springframework.data.redis.core.ValueOperations;
import com.nocountry.playattention.security.jwt.BlacklistedTokenRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ActiveProfiles;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class RedisTokenServiceTest {

    @Mock
    private RedisTemplate<String, Object> redisTemplate;

    @Mock
    private BlacklistedTokenRepository tokenRepository;

    @Mock
    private TokenCacheKeyGenerator cacheKeyGenerator;

    @InjectMocks
    private RedisTokenService redisTokenService;

    private static final String TEST_TOKEN = "test-token-123";
    private static final long EXPIRY_TIME = 3600000; // 1 hora en milisegundos

    @BeforeEach
    void setUp() {
        // Resetear los mocks antes de cada test
        reset(redisTemplate, tokenRepository, cacheKeyGenerator);
    }

    @Test
    void testAddToBlacklist() {
        // Configurar el mock para que opsForValue() devuelva un mock de ValueOperations
        ValueOperations<String, Object> valueOps = mock(ValueOperations.class);
        when(redisTemplate.opsForValue()).thenReturn(valueOps);
        
        // Cuando se añade un token a la lista negra
        redisTokenService.addToBlacklist(TEST_TOKEN, EXPIRY_TIME);

        // Verificar que se llamó a set con el token y el valor correcto
        verify(valueOps).set(anyString(), eq(TEST_TOKEN), eq(Duration.ofMillis(EXPIRY_TIME)));
        verify(tokenRepository).save(any());

        // Verificar que se llamó a Redis para almacenar el token
        verify(redisTemplate.opsForValue()).set(
            eq("tokenBlacklist:" + TEST_TOKEN),
            eq(TEST_TOKEN),
            eq(Duration.ofMillis(EXPIRY_TIME))
        );

        // Verificar que se llamó a MySQL para persistir el token
        verify(tokenRepository).save(any(BlackListedToken.class));
    }

    @Test
    void testIsBlacklisted_WhenTokenInRedis() {
        // Configurar el mock para que encuentre el token en Redis
        ValueOperations<String, Object> valueOps = mock(ValueOperations.class);
        when(redisTemplate.opsForValue()).thenReturn(valueOps);
        when(valueOps.get("tokenBlacklist:" + TEST_TOKEN)).thenReturn((Object) TEST_TOKEN);

        // Verificar que el token está en la lista negra
        assertTrue(redisTokenService.isBlacklisted(TEST_TOKEN));

        // Verificar que no se hizo la llamada a MySQL
        verify(tokenRepository, never()).existsByTokenValue(anyString());
    }

    @Test
    void testIsBlacklisted_WhenTokenInDatabase() {
        // Configurar el mock para que no encuentre el token en Redis
        ValueOperations<String, Object> valueOps = mock(ValueOperations.class);
        when(redisTemplate.opsForValue()).thenReturn(valueOps);
        when(valueOps.get("tokenBlacklist:" + TEST_TOKEN)).thenReturn(null);

        // Configurar el mock para que encuentre el token en la base de datos
        when(tokenRepository.existsByTokenValue(TEST_TOKEN))
            .thenReturn(true);

        // Verificar que el token está en la lista negra
        assertTrue(redisTokenService.isBlacklisted(TEST_TOKEN));
    }

    @Test
    void testRemoveFromBlacklist() {
        // Cuando se elimina un token de la lista negra
        redisTokenService.removeFromBlacklist(TEST_TOKEN);

        // Verificar que se llamó a Redis para eliminar el token
        verify(redisTemplate).delete(eq("tokenBlacklist:" + TEST_TOKEN));

        // Verificar que se llamó a MySQL para eliminar el token
        verify(tokenRepository).deleteByTokenValue(eq(TEST_TOKEN));
    }
}
