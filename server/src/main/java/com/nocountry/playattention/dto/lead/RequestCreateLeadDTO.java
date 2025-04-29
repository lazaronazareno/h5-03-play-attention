package com.nocountry.playattention.dto.lead;

import com.nocountry.playattention.model.ComplementTreatment;
import com.nocountry.playattention.model.LeadStatus;
import com.nocountry.playattention.model.UserType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record RequestCreateLeadDTO(
        @Schema(description = "Lead's first name", example = "John")
        String name,
        @Schema(description = "Lead's last name", example = "Doe")
        String lastName,
        @Schema(description = "Lead's email address", example = "john.doe@example.com")
        String email,
        @Schema(description = "Lead's institution or company", example = "Example University")
        String institution,
        @Schema(description = "Lead's phone number", example = "54 11 1234-5678")
        String phoneNumber,
        @Schema(description = "Complementary treatment type", example = "NEUROFEEDBACK")
        ComplementTreatment complementTreatment,
        @Schema(description = "Lead's profession or occupation", example = "Software Engineer")
        String profession,
        @Schema(description = "Target users for the service", example = "Children")
        String targetUsers,
        @Schema(description = "Indicates if the lead subscribed to the newsletter", example = "true")
        boolean newsletterSubscription,
        @Schema(description = "Context in which the service will be used", example = "Educational Setting")
        String usageContext,
        @Schema(description = "Type of lead (e.g., student, parent)", example = "INDIVIDUAL")
        UserType leadType,
        @Schema(description = "Current status of the lead (e.g., new, contacted, converted)", example = "NEW")
        LeadStatus status,
        @Schema(description = "Additional notes about the lead", example = "Interested in the cognitive therapy program.")
        String notes
) {
}
