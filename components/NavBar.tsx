import { signOutAction } from "@/lib/actions/auth";
import { auth } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";
import UserInfo from "./UserInfo";
import { NavigationLink } from "./NavigationLink";

const NavBar = async () => {
  return (
    <header>
      <nav className="flex justify-between">
        <div className="flex justify-between items-center gap-10">
          <Link href={"/"} className="logo ">
            <Image src={"/icons/logo.png"} alt="logo" width={24} height={24} />
            <p>DevEvents</p>
          </Link>
          <NavigationLink />
        </div>
        <UserInfo />
      </nav>
    </header>
  );
};

export default NavBar;
