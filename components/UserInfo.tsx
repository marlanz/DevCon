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
          <Link href={"/register"}>Register</Link>
          <Link href={"/login"}>Sign In</Link>
        </ul>
      ) : (
        <div className="flex gap-2 items-center max-w-78">
          {avatar && (
            <Image
              src={avatar}
              alt={session.user.name || "User avatar"}
              width={30}
              height={30}
              className="rounded-full shrink-0"
            />
          )}
          <p className="truncate">{session.user.name ?? session.user.email}</p>

          <Button type="submit" onClick={() => authClient.signOut()}>
            <LogOut />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
