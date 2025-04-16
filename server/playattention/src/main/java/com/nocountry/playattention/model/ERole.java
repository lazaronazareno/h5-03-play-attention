package com.nocountry.playattention.model;

/**
 * Enumeración que define los roles disponibles en el sistema
 */
public enum ERole {
    ROLE_USER,       // Usuario regular
    ROLE_PROFESSIONAL, // Profesional (médicos, terapeutas, etc.)
    ROLE_CORPORATE,   // Usuario corporativo (empresas)
    ROLE_ADMIN,       // Administrador con acceso a funciones de gestión
    ROLE_SUPER_ADMIN  // Super administrador con acceso completo al sistema
}