import Image from "next/image";
import Link from "next/link";
import UserInfo from "./UserInfo";
import { NavigationLink } from "./NavigationLink";
import { Suspense } from "react";

const NavBar = async () => {
  return (
    <header>
      <nav className="flex justify-between">
        <div className="flex justify-between items-center gap-10">
          <Link href={"/"} className="logo ">
            <Image src={"/icons/logo.png"} alt="logo" width={24} height={24} />
            <p>DevEvents</p>
          </Link>
          <Suspense fallback={<div>Loading...</div>}>
            <NavigationLink />
          </Suspense>
        </div>
        <UserInfo />
      </nav>
    </header>
  );
};

export default NavBar;
