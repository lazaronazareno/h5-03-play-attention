package com.nocountry.playattention.dto.lead;

import com.nocountry.playattention.model.ComplementTreatment;
import com.nocountry.playattention.model.LeadStatus;
import com.nocountry.playattention.model.UserType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
public class RequestCreateLeadDTO {
    @Schema(description = "Lead's first name", example = "John")
    @NotBlank(message = "Nombre es requerido")
    private String name;

    @Schema(description = "Lead's last name", example = "Doe")
    private String lastName;

    @Schema(description = "Lead's email address", example = "john.doe@example.com")
    @NotBlank(message = "Email es requerido")
    @Size(max = 50)
    @Email
    private String email;

    @Schema(description = "Lead's institution or company", example = "Example University")
    private String institution;

    @Schema(description = "Lead's phone number", example = "54 11 1234-5678")
    private String phoneNumber;

    @Schema(description = "Complementary treatment type", example = "Cognitive Therapy")
    private ComplementTreatment complementTreatment;

    @Schema(description = "Lead's profession or occupation", example = "Software Engineer")
    private String profession;

    @Schema(description = "Target users for the service", example = "Children")
    private String targetUsers;

    @Schema(description = "Indicates if the lead subscribed to the newsletter", example = "true")
    private boolean newsletterSubscription;

    @Schema(description = "Context in which the service will be used", example = "Educational Setting")
    private String usageContext;

    @Schema(description = "Type of lead (e.g., student, parent)", example = "STUDENT")
    private UserType leadType;

    @Schema(description = "Current status of the lead (e.g., new, contacted, converted)", example = "NEW")
    private LeadStatus status;

    @Schema(description = "Additional notes about the lead", example = "Interested in the cognitive therapy program.")
    private String notes;
}
