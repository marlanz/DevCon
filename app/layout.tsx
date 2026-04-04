import type { Metadata } from "next";
import LightRays from "@/components/LightRays";
import NavBar from "@/components/NavBar";
import { Providers } from "@/lib/queryClient";
import { Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevCon",
  description: "The hub for every dev event you mustn't miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} ${geistMono.variable} min-h-screen antialiased dark`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <NavBar />
            <main>{children}</main>
          </div>
          <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
            <LightRays
              raysOrigin="top-center"
              raysColor="#5dfeca"
              raysSpeed={0.5}
              lightSpread={0.9}
              rayLength={1.4}
              followMouse={true}
              mouseInfluence={0.02}
              noiseAmount={0}
              distortion={0.01}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
