import { authClient } from "@/lib/auth-client";
import { BetterAuthActionButton } from "./better-auth-action-button";
import {
  SUPPORTED_AUTH_PROVIDERS,
  SUPPORTED_OAUTH_PROVIDERS_DETAILS,
} from "./oauth-providers";

export function SocialAuthButtons() {
  return (
    <div className="flex justify-between gap-4">
      {SUPPORTED_AUTH_PROVIDERS.map((provider) => {
        const { Icon } = SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider];

        return (
          <BetterAuthActionButton
            variant="outline"
            key={provider}
            action={() => {
              return authClient.signIn.social({
                provider,
                callbackURL: "/",
              });
            }}
            className="flex-1"
          >
            <Icon />
            {SUPPORTED_OAUTH_PROVIDERS_DETAILS[provider].name}
          </BetterAuthActionButton>
        );
      })}
    </div>
  );
}
