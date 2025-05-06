package com.nocountry.playattention.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UsageContext {

    INVESTIGATING("Solo estoy investigando", "Investigating"),
    ADHD_DIAGNOSED("TDAH diagnosticado", "ADHD Diagnosed"),
    PRESCRIPTION_MEDICATION("Medicación recetada", "Prescription Medication"),
    NO_TREATMENT("Sin Tratamiento", "No Treatment"),
    IN_TREATMENT("En Tratamiento", "In Treatment"),
    OTHER("Otro", "Other");

    private final String spanishText;
    private final String englishText;

    public static UsageContext fromEnglishText(String englishText) {
        for (UsageContext situation : values()) {
            if (situation.getEnglishText().equalsIgnoreCase(englishText)) {
                return situation;
            }
        }
        throw new IllegalArgumentException("No constant with englishText " + englishText + " found in currentSituation enum");
    }

}
