package com.nocountry.playattention.controllers;

import com.nocountry.playattention.mappers.UserMapper;
import com.nocountry.playattention.model.ERole;
import com.nocountry.playattention.model.Role;
import com.nocountry.playattention.model.User;
import com.nocountry.playattention.model.UserType;
import com.nocountry.playattention.payload.request.LoginRequest;
import com.nocountry.playattention.payload.request.SignupRequest;
import com.nocountry.playattention.payload.response.JwtResponse;
import com.nocountry.playattention.payload.response.LoginResponseDTO;
import com.nocountry.playattention.payload.response.MessageResponse;
import com.nocountry.playattention.repository.RoleRepository;

import com.nocountry.playattention.repository.UserRepository;
import com.nocountry.playattention.security.jwt.JwtUtils;
import com.nocountry.playattention.security.services.UserDetailsImpl;
import com.nocountry.playattention.service.UserService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger(AuthController.class);
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
    @Autowired
    UserMapper userMapper;
    @Autowired
    UserService userService;
    // Endpoint para iniciar sesión

    @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Inicio de sesion exitoso")})
    @PostMapping("/signin")
    public ResponseEntity<MessageResponse<LoginResponseDTO>> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userService.findUserById(userDetails.getId());
//        List<Role> roles = userDetails.getAuthorities().stream()
//                .map(item -> {
//                    return roleRepository.findByName(ERole.valueOf(item.getAuthority()))
//                            .orElseThrow(() -> new RuntimeException("Error: Role not found."));
//                })
//                .collect(Collectors.toList());
//
//        List<ERole> rolesNames = roles.stream()
//                .map(Role::getName)
//                .toList();

        return ResponseEntity.ok(new MessageResponse<LoginResponseDTO>(
                "inicio de secion exitoso",
                new LoginResponseDTO(jwt, userMapper.mapToDTO(user))));
    }


    // Endpoint para registrar un nuevo usuario

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        // Validar si el nombre de usuario ya existe
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: El nombre de usuario ya está en uso", ""));
        }

        // Validar si el email ya existe
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: El email ya está en uso", ""));
        }

        // Crear nueva cuenta de usuario
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getName(),
                signUpRequest.getLastName(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword())
        );

        // Establecer tipo de usuario
        try {
            UserType userType = signUpRequest.getUserType();
            user.setUserType(userType);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Tipo de usuario inválido. Los tipos válidos son: " +
                            String.join(", ", UserType.values().toString()), ""));
        }

        // Establecer información adicional
        user.setInstitution(signUpRequest.getInstitution());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setProfession(signUpRequest.getProfession());
        user.setNewsletterSubscription(signUpRequest.isNewsletterSubscription());

        Set<ERole> eRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (eRoles == null || eRoles.isEmpty()) {
            // Si no se especifican roles, asignar ROLE_USER por defecto
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
            roles.add(userRole);
        } else {
            // Asignar roles según lo solicitado
            eRoles.forEach(eRole -> {
                        Role role = roleRepository.findByName(eRole)
                                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado." + eRole.name()));
                        roles.add(role);
                    }
            );
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Usuario registrado exitosamente", ""));
    }

    // Endpoint para cerrar sesión

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (headerAuth == null || !headerAuth.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body(new MessageResponse("Token de autorización no proporcionado", ""));
        }
        String token = jwtUtils.extractTokenFromBearer(headerAuth);
        if (token == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Token de autorización inválido", ""));
        }

        try {
            jwtUtils.invalidateToken(token);
            return ResponseEntity.ok(new MessageResponse("¡Sesión cerrada exitosamente!", ""));
        } catch (Exception e) {
            logger.error("Error al cerrar sesión: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error al cerrar sesión", ""));
        }
    }
}