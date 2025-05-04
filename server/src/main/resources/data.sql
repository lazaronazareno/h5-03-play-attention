-- Crear tabla de tipos de usuario
CREATE TABLE IF NOT EXISTS user_types (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200),
    PRIMARY KEY (id),
    UNIQUE KEY UK_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar tipos de usuario
INSERT IGNORE INTO user_types (name, description) VALUES 
('PROFESSIONAL', 'Profesionales de salud, educación, etc.'),
('INDIVIDUAL', 'Personas individuales'),
('CORPORATE', 'Empresas'),
('ADMIN', 'Administradores del sistema');

-- Inicialización de roles
CREATE TABLE IF NOT EXISTS roles (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY UK_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar roles básicos
INSERT IGNORE INTO roles (name) VALUES ('ROLE_USER');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_PROFESSIONAL');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_CORPORATE');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_ADMIN');
INSERT IGNORE INTO roles (name) VALUES ('ROLE_SUPER_ADMIN');
