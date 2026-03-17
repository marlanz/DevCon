import { signOutAction } from "@/lib/actions/auth";
import { auth } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import UserInfo from "./UserInfo";

const NavBar = async () => {
  return (
    <header>
      <nav>
        <Link href={"/"} className="logo">
          <Image src={"/icons/logo.png"} alt="logo" width={24} height={24} />
          <p>DevEvents</p>
        </Link>
        <ul className="">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Events</Link>
          <Link href={"/"}>Create Event</Link>
          <UserInfo />
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
