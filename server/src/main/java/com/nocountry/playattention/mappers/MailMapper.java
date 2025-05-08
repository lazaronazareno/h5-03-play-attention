package com.nocountry.playattention.mappers;

import com.nocountry.playattention.dto.mail.MailResponseDTO;
import com.nocountry.playattention.dto.mail.SendMailUserDTO;
import com.nocountry.playattention.model.Mail;
import com.nocountry.playattention.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface MailMapper {

    @Mapping(source = "to", target = "recipient")
    @Mapping(target = "sendDate", ignore = true)
    Mail mapToEntity(SendMailUserDTO sendMailUserDTO);

    @Mapping(source = "recipient", target = "to")
    @Mapping(expression = "java(mapUserToDTO(mail.getUser()))", target = "from")
    MailResponseDTO mapToDTO(Mail mail);

    List<MailResponseDTO> mapToDTOList(List<Mail> mailList);
    default String mapUserToDTO(User user) {
        return user.getEmail();
    }

}
