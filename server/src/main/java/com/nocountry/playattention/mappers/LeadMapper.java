package com.nocountry.playattention.mappers;

import com.nocountry.playattention.dto.lead.RequestCreateLeadDTO;
import com.nocountry.playattention.model.Lead;
import com.nocountry.playattention.model.ComplementTreatment;
import com.nocountry.playattention.model.LeadStatus;
import com.nocountry.playattention.model.UserType;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface LeadMapper {
    LeadMapper INSTANCE = Mappers.getMapper(LeadMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Lead mapToEntity(RequestCreateLeadDTO leadDTO);

    default String map(String source) {
        return source != null ? source : "";
    }

    default Boolean map(Boolean source) {
        return source != null ? source : false;
    }

    default ComplementTreatment map(ComplementTreatment source) {
        if (source == null) {
            return ComplementTreatment.OTHER;
        }
        return source;
    }

    default UserType map(UserType source) {
        return source != null ? source : UserType.INDIVIDUAL;
    }

    default LeadStatus map(LeadStatus source) {
        return source != null ? source : LeadStatus.NEW;
    }
}
