package com.nocountry.playattention.controllers;

import com.nocountry.playattention.model.ERole;
import com.nocountry.playattention.model.Role;
import com.nocountry.playattention.model.User;
import com.nocountry.playattention.model.UserType;
import com.nocountry.playattention.payload.request.LoginRequest;
import com.nocountry.playattention.payload.request.SignupRequest;
import com.nocountry.playattention.payload.response.JwtResponse;
import com.nocountry.playattention.payload.response.MessageResponse;
import com.nocountry.playattention.repository.RoleRepository;

import com.nocountry.playattention.repository.UserRepository;
import com.nocountry.playattention.security.jwt.JwtUtils;
import com.nocountry.playattention.security.services.UserDetailsImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


 // Controlador para manejar la autenticación y registro de usuarios

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;


     // Endpoint para iniciar sesión

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                userDetails.getFullName(),
                roles));
    }


     // Endpoint para registrar un nuevo usuario

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        // Validar si el nombre de usuario ya existe
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: El nombre de usuario ya está en uso"));
        }

        // Validar si el email ya existe
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: El email ya está en uso"));
        }

        // Crear nueva cuenta de usuario
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getFullName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        // Establecer tipo de usuario
        try {
            UserType userType = UserType.valueOf(signUpRequest.getUserType().toUpperCase());
            user.setUserType(userType);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Tipo de usuario inválido. Los tipos válidos son: " + 
                            String.join(", ", UserType.values().toString())));
        }

        // Establecer información adicional
        user.setInstitution(signUpRequest.getInstitution());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setProfession(signUpRequest.getProfession());
        user.setNewsletterSubscription(signUpRequest.isNewsletterSubscription());

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            // Si no se especifican roles, asignar ROLE_USER por defecto
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
            roles.add(userRole);
        } else {
            // Asignar roles según lo solicitado
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
                        roles.add(adminRole);
                        break;
                    case "superadmin":
                        Role superAdminRole = roleRepository.findByName(ERole.ROLE_SUPER_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
                        roles.add(superAdminRole);
                        break;
                    case "professional":
                        Role professionalRole = roleRepository.findByName(ERole.ROLE_PROFESSIONAL)
                                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
                        roles.add(professionalRole);
                        break;
                    case "corporate":
                        Role corporateRole = roleRepository.findByName(ERole.ROLE_CORPORATE)
                                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
                        roles.add(corporateRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Usuario registrado exitosamente"));
    }

    // Endpoint para cerrar sesión

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        String token = jwtUtils.extractTokenFromBearer(headerAuth);

        if (token != null) {
            jwtUtils.invalidateToken(token);
        }

        return ResponseEntity.ok(new MessageResponse("¡Sesión cerrada exitosamente!"));
    }
}