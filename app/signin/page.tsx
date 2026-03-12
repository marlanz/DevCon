import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { signInAction } from "@/lib/actions/auth";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <form
        action={signInAction}
        className="flex flex-col gap-3 w-64"
        autoComplete="off"
      >
        <Input type="email" name="email" placeholder="Email" required />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit">Sign In</Button>
      </form>
    </div>
  );
}
