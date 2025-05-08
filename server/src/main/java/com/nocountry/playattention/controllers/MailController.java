package com.nocountry.playattention.controllers;

import com.nocountry.playattention.dto.mail.MailResponseDTO;
import com.nocountry.playattention.dto.mail.MailsLeadRequest;
import com.nocountry.playattention.dto.mail.SendMailUserDTO;
import com.nocountry.playattention.dto.recover.RecoverPasswordRequestDTO;
import com.nocountry.playattention.payload.response.MessageResponse;
import com.nocountry.playattention.security.services.UserDetailsImpl;
import com.nocountry.playattention.service.email.IEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/mail")
public class MailController {

    private final IEmailService emailService;

    @PostMapping("/recover-password")
    public ResponseEntity<MessageResponse> recoverPassword(@RequestBody RecoverPasswordRequestDTO recoverPasswordRequest) {
        emailService.recoverPassword(recoverPasswordRequest);
        return ResponseEntity.ok(new MessageResponse(
                "Se ha enviado un correo electrónico con las instrucciones para restablecer su contraseña.",
                ""));
    }

    @PostMapping("/send-mail-user")
    public ResponseEntity<MessageResponse<MailResponseDTO>> sendMailUser(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody SendMailUserDTO sendMailUserDTO) {

        MailResponseDTO mailResponseDTO = emailService.sendMailUser(sendMailUserDTO);
        return ResponseEntity.ok(new MessageResponse<>(
                "Se ha enviado un correo electrónico de bienvenida a su cuenta.",
                mailResponseDTO
        ));
    }

    @GetMapping("/mails-leads/{idLead}")
    public ResponseEntity<List<MailResponseDTO>> getMailsLeadsByMail(
            @PathVariable Long idLead
    ) {
        List<MailResponseDTO> mailResponseDTOList = emailService.getMailsLeads(idLead);
        return ResponseEntity.ok(mailResponseDTOList);
    }

    @GetMapping("/mails-leads-by-id")
    public ResponseEntity<List<MailResponseDTO>> getMailsLeadsByMail(
            @RequestParam  String mailLead
    ) {
        System.out.println(mailLead);
        List<MailResponseDTO> mailResponseDTOList = emailService.getMailsLeads(mailLead);

        return ResponseEntity.ok(mailResponseDTOList);
    }

}
