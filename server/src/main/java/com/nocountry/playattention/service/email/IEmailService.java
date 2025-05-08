package com.nocountry.playattention.service.email;

import com.nocountry.playattention.dto.mail.MailResponseDTO;
import com.nocountry.playattention.dto.mail.SendMailUserDTO;
import com.nocountry.playattention.dto.recover.RecoverPasswordRequestDTO;

import java.util.List;
import java.util.Map;

public interface IEmailService {

    void sendTemplateEmail(String[] to, String subject, Map<String, Object> variables, String templateName);

    void sendEmailSample(String[] to, String subject, String text);

    void recoverPassword(RecoverPasswordRequestDTO recoverPasswordRequest);

    MailResponseDTO sendMailUser(SendMailUserDTO sendMailUserDTO);

    List<MailResponseDTO> getMailsLeads(Long idLead);

    List<MailResponseDTO> getMailsLeads(String idLead);
}
