import { ComponentProps, ElementType } from "react";
import { DiscordIcon, GitHubIcon, GoogleIcon } from "./oauth-icons";

export const SUPPORTED_AUTH_PROVIDERS = [
  "github",
  "discord",
  "google",
] as const;
export type SupportedOAuthProviders = (typeof SUPPORTED_AUTH_PROVIDERS)[number];

export const SUPPORTED_OAUTH_PROVIDERS_DETAILS: Record<
  SupportedOAuthProviders,
  { name: string; Icon: ElementType<ComponentProps<"svg">> }
> = {
  discord: {
    name: "Discord",
    Icon: DiscordIcon,
  },
  github: {
    name: "Github",
    Icon: GitHubIcon,
  },
  google: {
    name: "Google",
    Icon: GoogleIcon,
  },
};
