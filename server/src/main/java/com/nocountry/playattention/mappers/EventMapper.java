package com.nocountry.playattention.mappers;

import com.nocountry.playattention.dto.event.EventCreateRequestDTO;
import com.nocountry.playattention.dto.event.EventResponseDTO;
import com.nocountry.playattention.dto.event.EventUserResponseDTO;
import com.nocountry.playattention.dto.lead.EventRequestDTO;
import com.nocountry.playattention.dto.user.UserResponseDTO;
import com.nocountry.playattention.model.Event;
import com.nocountry.playattention.model.EventUser;
import com.nocountry.playattention.model.Role;
import com.nocountry.playattention.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import java.util.Set;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventMapper {

    @Mapping(target = "eventUsers", ignore = true)
    @Mapping(target = "notified", constant = "false")
    Event mapToEntity(EventRequestDTO dto);

    @Mapping(target = "eventUsers", ignore = true)
    @Mapping(target = "notified", constant = "false")
    Event mapToEntity(EventCreateRequestDTO dto);

    // Nuevo mapeo de entidad a DTO de salida
    EventResponseDTO mapToDto(Event event);

    EventUserResponseDTO mapToDto(EventUser eventUser);

    UserResponseDTO mapToDto(User user);

    // Métodos auxiliares existentes
    default Set<Role> mapRoleIdsToRoles(Set<Long> roleIds, RoleFetcher fetcher) {
        return fetcher.findRolesByIds(roleIds);
    }

    default Set<User> mapUserIdsToUsers(Set<Long> userIds, UserFetcher fetcher) {
        return fetcher.findUsersByIds(userIds);
    }

    interface RoleFetcher {
        Set<Role> findRolesByIds(Set<Long> ids);
    }

    interface UserFetcher {
        Set<User> findUsersByIds(Set<Long> ids);
    }
}

