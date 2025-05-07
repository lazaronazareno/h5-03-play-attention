package com.nocountry.playattention.service;


import com.nocountry.playattention.dto.recover.RecoverPasswordRequestDTO;
import com.nocountry.playattention.dto.recover.ResetPasswordRequestDTO;
import com.nocountry.playattention.model.User;
import com.nocountry.playattention.repository.UserRepository;
import com.nocountry.playattention.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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
        user.setName(userDetails.getName());
        user.setLastName(userDetails.getLastName());
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
        user.setName(userDetails.getName());
        user.setLastName(userDetails.getLastName());
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

    public User fintUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Error: No se encontro el mail del usuario"));
    }

    public void resetPassword(ResetPasswordRequestDTO resetPassword, UserDetailsImpl userDetails) {
        if(Objects.equals(resetPassword.password(), resetPassword.repeatPassword())){
            User user=fintUserByEmail(userDetails.getEmail());
            user.setPassword(passwordEncoder.encode(resetPassword.password()));
        } else {
            throw new RuntimeException( "Error: Las contraseñas no coinciden");
        }

    }

    public User findUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Usuario no encontrado con id" + id));
    }
}