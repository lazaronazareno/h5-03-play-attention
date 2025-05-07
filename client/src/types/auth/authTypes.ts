import { User } from "../user/userTypes";

export interface ResponseSignIn {
	token: string;
	user: User
}
