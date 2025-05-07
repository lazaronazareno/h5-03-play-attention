import { User } from "../types/user/userTypes";

export const defaultUser: User = {
    id: 0,
    username: "defaultUser",
    name: "Default",
    lastName: "User",
    email: "default@example.com",
    institution: "Default Institution",
    phoneNumber: "123-456-7890",
    profession: "Default Profession",
    newsletterSubscription: false,
    roles: ["ROLE_USER"],
    userType: "default"
}