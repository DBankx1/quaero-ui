import "~/styles/globals.css";
import { type Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "~/components/theme-provider";
import { AppContainer } from "~/components/ui/app-container";

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

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${satoshiFont.variable}`}
    >
      <head nonce=""></head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* // TODO: remove shadow - for development */}
          <AppContainer className="h-screen" shadow="lg" size="xl">
            {children}
          </AppContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
