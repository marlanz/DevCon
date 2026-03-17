"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "./Button";
import { LogOut } from "lucide-react";

const UserInfo = () => {
  const { data: session, isPending: loading } = authClient.useSession();
  if (loading) return <div className="">Loading...</div>;
  console.log(session);

  return (
    <div>
      {!session ? (
        <ul>
          <Link href={"/signup"}>Register</Link>
          <Link href={"/signin"}>Sign In</Link>
        </ul>
      ) : (
        <div className="flex gap-2 items-center">
          <p>Hello {session.user.name ?? session.user.email}</p>

          <Button type="submit" onClick={() => authClient.signOut()}>
            <LogOut />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
