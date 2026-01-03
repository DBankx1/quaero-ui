import "~/styles/globals.css";

import { type Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Quaero",
  description: "Your AI-Powered Business Search Engine",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const satoshiFont = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-Light.woff2",
      weight: "200",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${satoshiFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
