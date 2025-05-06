package com.nocountry.playattention.mappers;

import com.nocountry.playattention.dto.lead.RequestCreateLeadDTO;
import com.nocountry.playattention.dto.lead.ResponseCreateLeadDTO;
import com.nocountry.playattention.model.Lead;
import org.mapstruct.Mapper;
import com.nocountry.playattention.model.UserType;
import com.nocountry.playattention.model.LeadStatus;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;
import com.nocountry.playattention.model.ComplementTreatment;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = "spring")
public interface LeadMapper {

    LeadMapper INSTANCE = Mappers.getMapper(LeadMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "lastUpdated", ignore = true)
    Lead mapToEntity(RequestCreateLeadDTO leadDTO);



    default String mapString(String source) {
        return source != null ? source : "";
    }

    default Boolean mapBoolean(Boolean source) {
        return source != null ? source : false;
    }

    default ComplementTreatment mapComplementTreatment(ComplementTreatment source) {
        return source != null ? source : ComplementTreatment.OTHER;
    }

    default UserType mapUserType(UserType source) {
        return source != null ? source : UserType.INDIVIDUAL;
    }

    default LeadStatus mapLeadStatus(LeadStatus source) {
        return source != null ? source : LeadStatus.NEW;
    }

    default Lead mapToEntityWithDefaults(RequestCreateLeadDTO leadDTO) {
        Lead lead = mapToEntity(leadDTO);
        if (lead.getStatus() == null) {
            lead.setStatus(LeadStatus.NEW);
        }
        if (lead.getLeadType() == null) {
            lead.setLeadType(UserType.INDIVIDUAL);
        }
        return lead;
    }

    ResponseCreateLeadDTO mapToDTO(Lead savedLead);
}
