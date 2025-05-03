package com.nocountry.playattention.controllers;

import com.nocountry.playattention.dto.recover.RecoverPasswordRequestDTO;
import com.nocountry.playattention.payload.response.MessageResponse;
import com.nocountry.playattention.service.email.IEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/mail")
public class MailController {

    private final IEmailService emailService;

    @PostMapping("/recover-password")
    public ResponseEntity<MessageResponse> recoverPassword(@RequestBody RecoverPasswordRequestDTO recoverPasswordRequest) {
        emailService.recoverPassword(recoverPasswordRequest);
        return ResponseEntity.ok(new MessageResponse("Se ha enviado un correo electrónico con las instrucciones para restablecer su contraseña."));
    }

    @GetMapping("/test")
    public ResponseEntity<MessageResponse> test() {
        return ResponseEntity.ok(new MessageResponse("Mail controller working"));
    }
}
