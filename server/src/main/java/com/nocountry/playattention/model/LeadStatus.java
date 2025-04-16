package com.nocountry.playattention.model;


 // Enum que define los posibles estados de un lead en el pipeline de ventas

public enum LeadStatus {
    NEW,             // Lead recién ingresado
    CONTACTED,       // Se ha establecido contacto inicial
    INTERESTED,      // Lead muestra interés
    MEETING_SCHEDULED, // Reunión agendada
    PROPOSAL_SENT,   // Propuesta enviada
    NEGOTIATION,     // En negociación
    CLOSED_WON,      // Venta cerrada exitosamente
    CLOSED_LOST,     // Oportunidad perdida
    FOLLOW_UP        // Seguimiento pendiente
}