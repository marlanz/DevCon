import { signOutAction } from "@/lib/actions/auth";
import { auth } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";

const NavBar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header>
      <nav>
        <Link href={"/"} className="logo">
          <Image src={"/icons/logo.png"} alt="logo" width={24} height={24} />
          <p>DevEvent</p>
        </Link>
        <ul className="">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Events</Link>
          <Link href={"/"}>Create Event</Link>
          {!session ? (
            <>
              <Link href={"/signup"}>Register</Link>
              <Link href={"/signin"}>Sign In</Link>
            </>
          ) : (
            <>
              <p>Hello {session.user.name ?? session.user.email}</p>
              <form action={signOutAction}>
                <Button type="submit">
                  <LogOut />
                </Button>
              </form>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
