import { SocialAuthButtons } from "./auth/SocialAuthButton";

export function SocialAuthSection() {
  return (
    <div className="mt-6 space-y-4">
      <div className="relative">
        <div className="relative flex justify-center text-sm">
          <span className="px-2  text-white">Or continue with</span>
        </div>
      </div>

      <SocialAuthButtons />
    </div>
  );
}
