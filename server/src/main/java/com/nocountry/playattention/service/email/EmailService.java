package com.nocountry.playattention.service.email;

import com.nocountry.playattention.dto.mail.MailResponseDTO;
import com.nocountry.playattention.dto.mail.SendMailUserDTO;
import com.nocountry.playattention.dto.recover.RecoverPasswordRequestDTO;
import com.nocountry.playattention.mappers.MailMapper;
import com.nocountry.playattention.model.Lead;
import com.nocountry.playattention.model.Mail;
import com.nocountry.playattention.model.User;
import com.nocountry.playattention.repository.LeadRepository;
import com.nocountry.playattention.repository.MailRepository;
import com.nocountry.playattention.security.jwt.JwtUtils;
import com.nocountry.playattention.security.services.UserDetailsImpl;
import com.nocountry.playattention.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final MailRepository mailRepository;
    private final MailMapper mailMapper;
    private final LeadRepository leadRepository;

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
    public void sendEmailSample(String[] to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
//      envio el email
        mailSender.send(message);
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

    @Override
    public MailResponseDTO sendMailUser(SendMailUserDTO sendMailUserDTO) {
        UserDetailsImpl userDetails = userService.getCurrentUser();
        User user = userService.fintUserByEmail(userDetails.getEmail());
        Mail mail = mailMapper.mapToEntity(sendMailUserDTO);
        mail.setUser(user);
        mailRepository.save(mail);
        MailResponseDTO mailResponseDTO = mailMapper.mapToDTO(mail);

        String[] email = {sendMailUserDTO.to()};
        sendEmailSample(email, sendMailUserDTO.subject(), sendMailUserDTO.message());
        return mailResponseDTO;
    }

    @Override
    public List<MailResponseDTO> getMailsLeads(Long idLead) {
        Lead lead = leadRepository.findById(idLead).orElseThrow(() -> new RuntimeException("Lead not found"));
        List<Mail> mails = mailRepository.findByRecipientContaining(lead.getEmail());
        return mailMapper.mapToDTOList(mails);
    }

    @Override
    public List<MailResponseDTO> getMailsLeads(String mailLead) {
        System.out.println("MAIL LEAD" + mailLead);
        List<Mail> mails = mailRepository.findByRecipientContaining(mailLead);

        return mailMapper.mapToDTOList(mails);
    }


}
