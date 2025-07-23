"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CircleHelp, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Button from "../ui/Button";
import UserAvatar from "../../../public/user/avatar.png";
import Link from "next/link";
import { userDefault } from "../../constants/dataDefault";
import { User } from "../../types/user/userTypes";
import Cookies from "js-cookie";

export default function UserNavbar() {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const router = useRouter();

	const toggleSidebar = () => setSidebarOpen((prev) => !prev);

	const closeSidebar = () => setSidebarOpen(false);
	// --------------- BORRAR LUEGO -------------------
	const [user, setUser] = useState<User>(userDefault);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedUser: User = JSON.parse(Cookies.get("user") || "{}") || userDefault;
			setUser(storedUser);
		}
	}, []);
	// --------------------------------------------------
	return (
		<>
			<header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-neutral-white2 p-4 text-sm shadow-xl">
				<div className="flex items-center gap-2">
					<Image src={UserAvatar} alt="Avatar" width={24} height={24} className="w-auto rounded-full" />
					<p>
						{user.name} {user.lastName}
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Link href="/">
						<Image src="/branding/LogoFullAR.png" alt="Logo" width={200} height={50} />
					</Link>
				</div>
				<div className="flex gap-4">
					{/* <button
						className="cursor-pointer text-violet-main"
						onClick={() => {
							console.log("notification");
						}}
					>
						<Bell size={24} />
					</button> */}
					<Button
						text="Ayuda"
						variant="primary"
						icon={<CircleHelp />}
						iconPosition="right"
						onClick={() => {
							router.push("/dashboard/support");
						}}
						className="md:hidden h-12 items-center justify-center flex"
					/>
					{/* Mobile menu */}
					<button className="cursor-pointer text-violet-main md:hidden" onClick={toggleSidebar}>
						{sidebarOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</header>

			{/* Sidebar visible en mobile o fijo en desktop */}
			<Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
		</>
	);
}
