package com.nocountry.playattention.controllers;

import com.nocountry.playattention.dto.mail.SendMailUserDTO;
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
        return ResponseEntity.ok(new MessageResponse("Se ha enviado un correo electrónico con las instrucciones para restablecer su contraseña.", ""));
    }

    @PostMapping("/send-mail-user")
    public ResponseEntity<MessageResponse<String>> sendMailUser(
            @RequestBody SendMailUserDTO sendMailUserDTO) {

        emailService.sendMailUser(sendMailUserDTO);
        return ResponseEntity.ok(new MessageResponse<>(
                "Se ha enviado un correo electrónico de bienvenida a su cuenta.",
                ""));
    }
}
