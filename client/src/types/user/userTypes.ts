type roles = ["ROLE_USER"| "ROLE_PROFESSIONAL"| "ROLE_CORPORATE"| "ROLE_ADMIN"| "ROLE_SUPER_ADMIN"];
export interface User {
	id: number;
	username: string;
	name: string;
	lastName: string;
	email: string;
	institution: string;
	phoneNumber: string;
	profession: string;
	newsletterSubscription: boolean;
	roles: roles
	userType: string;
}
