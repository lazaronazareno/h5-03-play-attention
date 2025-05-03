package com.nocountry.playattention.controllers;

import com.nocountry.playattention.dto.recover.RecoverPasswordRequestDTO;
import com.nocountry.playattention.payload.response.MessageResponse;
import com.nocountry.playattention.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mail")
public class MailController {

    private final UserService userService;
    @PostMapping("/recover-password")
    public ResponseEntity<?> recoverPassword(@RequestBody RecoverPasswordRequestDTO recoverPasswordRequest) {
        userService.recoverPassword(recoverPasswordRequest);
        return ResponseEntity.ok(new MessageResponse("Se ha enviado un correo electrónico con las instrucciones para restablecer su contraseña."));
    }
}
