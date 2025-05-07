package com.nocountry.playattention.mappers;

import com.nocountry.playattention.dto.user.UserResponseDTO;
import com.nocountry.playattention.model.ERole;
import com.nocountry.playattention.model.Role;
import com.nocountry.playattention.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserResponseDTO mapToDTO(User user);
    default Set<ERole> mapRoles(Set<Role> roles){
        return roles.stream().map(role -> ERole.valueOf(role.getName().name())).collect(Collectors.toSet());
    }
}
