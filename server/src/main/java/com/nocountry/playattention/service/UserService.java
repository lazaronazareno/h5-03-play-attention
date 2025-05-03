package com.nocountry.playattention.service;


import com.nocountry.playattention.dto.recover.RecoverPasswordRequestDTO;
import com.nocountry.playattention.model.User;
import com.nocountry.playattention.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


 // Servicio para la gestión de usuarios

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


     // Encuentra un usuario por su ID con roles

    public Optional<User> findById(Long id) {
        return userRepository.findByIdWithRoles(id);
    }


     // Obtiene todos los usuarios

    public List<User> findAll() {
        return userRepository.findAll();
    }


     // Actualiza el perfil de un usuario

    public User updateProfile(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        // Actualizar solo los campos permitidos para actualización de perfil
        user.setFullName(userDetails.getFullName());
        user.setEmail(userDetails.getEmail());
        user.setInstitution(userDetails.getInstitution());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setProfession(userDetails.getProfession());
        user.setNewsletterSubscription(userDetails.isNewsletterSubscription());

        // Si se proporciona una nueva contraseña, actualizarla
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        return userRepository.save(user);
    }


     //Actualiza un usuario (para administradores)

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        // Actualizar todos los campos permitidos para administradores
        user.setUsername(userDetails.getUsername());
        user.setFullName(userDetails.getFullName());
        user.setEmail(userDetails.getEmail());
        user.setInstitution(userDetails.getInstitution());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setProfession(userDetails.getProfession());
        user.setUserType(userDetails.getUserType());
        user.setNewsletterSubscription(userDetails.isNewsletterSubscription());
        user.setRoles(userDetails.getRoles());

        // Si se proporciona una nueva contraseña, actualizarla
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        }

        return userRepository.save(user);
    }


     // Elimina un usuario

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado."));

        userRepository.delete(user);
    }

    public void recoverPassword(RecoverPasswordRequestDTO recoverPasswordRequest) {
        
    }
}