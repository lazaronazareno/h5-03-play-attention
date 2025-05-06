package com.nocountry.playattention.model;


 // Enum que define los posibles estados de un lead en el pipeline de ventas

public enum LeadStatus {
    NEW,             // Lead recién ingresado
    CONTACTED,       // Se ha establecido contacto inicial
    AFTER_SALES,
    CLIENT,
    CANCELED
}
