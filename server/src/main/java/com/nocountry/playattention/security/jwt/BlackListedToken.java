package com.nocountry.playattention.security.jwt;

import jakarta.persistence.*;

import java.util.Date;

 // Entidad JPA para almacenar tokens invalidados en la base de datos

@Entity
@Table(name = "blacklisted_tokens")
@NamedQueries({
    @NamedQuery(name = "BlackListedToken.deleteAllExpiredTokens.count",
               query = "SELECT COUNT(b) FROM BlackListedToken b WHERE b.expiryDate < :expiryDate"),
    @NamedQuery(name = "BlackListedToken.deleteByTokenValue",
               query = "DELETE FROM BlackListedToken b WHERE b.tokenValue = :tokenValue")
})
public class BlackListedToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "token_value", length = 500, nullable = false, unique = true)
    private String tokenValue;

    @Column(name = "expiry_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date expiryDate;

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public BlackListedToken() {
    }

    // Constructor con parámetros para facilitar la creación
    public BlackListedToken(String tokenValue, Date expiryDate) {
        this.tokenValue = tokenValue;
        this.expiryDate = expiryDate;
        this.createdAt = new Date();
    }
    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTokenValue() {
        return tokenValue;
    }

    public void setTokenValue(String tokenValue) {
        this.tokenValue = tokenValue;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}