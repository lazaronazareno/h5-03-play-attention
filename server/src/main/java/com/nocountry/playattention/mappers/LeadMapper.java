package com.nocountry.playattention.mappers;

import com.nocountry.playattention.dto.lead.RequestCreateLeadDTO;
import com.nocountry.playattention.model.Lead;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface LeadMapper {
    Lead mapToEntity(RequestCreateLeadDTO leadDTO);
}
