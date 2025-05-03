package com.nocountry.playattention.service.email;

import com.nocountry.playattention.dto.recover.RecoverPasswordRequestDTO;
import com.nocountry.playattention.model.User;
import com.nocountry.playattention.repository.UserRepository;
import com.nocountry.playattention.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.File;
import java.util.ArrayList;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final UserService userService;

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

        Map<String, Object> variables = Map.of(
                "name", user.getFullName(),
                "tokenUrl","http://localhost:8080/api/swagger-ui/index.html#"
        );

        sendTemplateEmail(
                email,
                "Recuperación de contraseña",
                variables,
                "recover-password");
    }
}
