import { User } from "../types/user/userTypes";

export const userDefault: User = {
	id: 0,
	username: "defaultUser",
	name: "John",
	lastName: "Doe",
	email: "default@example.com",
	institution: "Default Institution",
	phoneNumber: "123-456-7890",
	profession: "Default Profession",
	newsletterSubscription: false,
	roles: ["ROLE_USER"],
	userType: "default",
};
