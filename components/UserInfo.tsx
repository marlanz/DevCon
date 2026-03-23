"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "./Button";
import { LogOut } from "lucide-react";
import Image from "next/image";

const UserInfo = () => {
  const { data: session, isPending: loading } = authClient.useSession();
  if (loading) return <div className="">Loading...</div>;

  const avatar = session?.user.image;

  return (
    <div>
      {!session ? (
        <ul>
          <Link href={"/signup"}>Register</Link>
          <Link href={"/signin"}>Sign In</Link>
        </ul>
      ) : (
        <div className="flex gap-2 items-center">
          {avatar && (
            <Image
              src={avatar}
              alt={session.user.name || "User avatar"}
              width={30}
              height={30}
              className="rounded-full"
            />
          )}
          <p>{session.user.name ?? session.user.email}</p>

          <Button type="submit" onClick={() => authClient.signOut()}>
            <LogOut />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
