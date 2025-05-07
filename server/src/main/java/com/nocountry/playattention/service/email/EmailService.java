package com.nocountry.playattention.service.email;

import com.nocountry.playattention.dto.recover.RecoverPasswordRequestDTO;
import com.nocountry.playattention.model.User;
import com.nocountry.playattention.repository.UserRepository;
import com.nocountry.playattention.security.jwt.JwtUtils;
import com.nocountry.playattention.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final UserService userService;
    private final JwtUtils jwtUtils;
    @Value("${frontend.url}")
    private String FRONTEND_URL;

    public void sendTemplateEmail(String[] to, String subject, Map<String, Object> variables, String templateName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);

            // Procesamos la plantilla con las variables
            Context context = new Context();
            context.setVariables(variables);
            String htmlContent = templateEngine.process(templateName, context);

            helper.setText(htmlContent, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void recoverPassword(RecoverPasswordRequestDTO recoverPasswordRequest) {
        String[] email = {recoverPasswordRequest.email()};
        User user = userService.fintUserByEmail(recoverPasswordRequest.email());
        String token = jwtUtils.generateJwtToken(user.getUsername());

        Map<String, Object> variables = new HashMap<>();

        variables.put("name", user.getName());
        variables.put("tokenUrl", FRONTEND_URL + "recover-password/" + token);

        sendTemplateEmail(
                email,
                "Recuperación de contraseña",
                variables,
                "recover-password");
    }
}
