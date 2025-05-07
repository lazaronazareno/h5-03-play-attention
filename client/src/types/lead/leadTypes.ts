export type LeadFormData = {
	name: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	country: "Argentina" | "Brasil" | "Chile" | "Uruguay" | "Otro";
	leadType: "PROFESSIONAL" | "INDIVIDUAL" | "CORPORATE";
	institution?: string;
	targetUsers: "Children" | "Adult" | "Patient" | "Professional";
	usageContext:
		| "INVESTIGATING"
		| "ADHD_DIAGNOSED"
		| "PRESCRIPTION_MEDICATION"
		| "NO_TREATMENT"
		| "IN_TREATMENT"
		| "OTHER";
	complementTreatment: "NEUROFEEDBACK" | "INVESTIGATION" | "BRAINAPP" | "OTHER";
	notes: string;
	newsletterSubscription: boolean;
};
