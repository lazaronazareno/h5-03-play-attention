package com.nocountry.playattention.controllers;

import com.nocountry.playattention.model.User;
import com.nocountry.playattention.payload.response.MessageResponse;
import com.nocountry.playattention.security.services.UserDetailsImpl;
import com.nocountry.playattention.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador para la gestión de usuarios
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Obtiene el perfil del usuario autenticado
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        // No devolver la contraseña
        user.setPassword(null);

        return ResponseEntity.ok(user);
    }

    /**
     * Actualiza el perfil del usuario autenticado
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(@RequestBody User userRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User updatedUser = userService.updateProfile(userDetails.getId(), userRequest);

        return ResponseEntity.ok(new MessageResponse("Perfil actualizado exitosamente"));
    }

    /**
     * Obtiene todos los usuarios (solo para administradores)
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();

        // No devolver contraseñas
        users.forEach(user -> user.setPassword(null));

        return ResponseEntity.ok(users);
    }

    /**
     * Obtiene un usuario por su ID (solo para administradores)
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        // No devolver la contraseña
        user.setPassword(null);

        return ResponseEntity.ok(user);
    }

    /**
     * Actualiza un usuario (solo para administradores)
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(id, userDetails);

        return ResponseEntity.ok(new MessageResponse("Usuario actualizado exitosamente"));
    }

    /**
     * Elimina un usuario (solo para administradores)
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPER_ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);

        return ResponseEntity.ok(new MessageResponse("Usuario eliminado exitosamente"));
    }
}