import type { Metadata } from "next";
import { Anybody, Cuprum } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/navigation/footer";
import dynamic from "next/dynamic";

// dynamic navbar for  animations
const DynamicNavbar = dynamic(() => import("@/components/navigation/navbar"), {
  ssr: false,
})
////////////////////////

//fonts
export const bodyFont = Anybody({
  subsets: ["latin"],
  variable: "--font-body",
});
export const titleFont = Cuprum({
  subsets: ["latin"],
  variable: "--font-title",
});
//fonts

//metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://mxnan.com"),
  title: {
    template: "%s || mxnan.com",
    default: "mxnan.com",
  },
  description: `Personal website, creating components and some blogs . `,
  icons: {
    icon: "/favicon.ico",
  },
};

//layout function
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative w-full font-body",
          bodyFont.variable,
          titleFont.variable
        )}
      >
        <Providers>
          <DynamicNavbar />
          <main className="py-28 mx-auto container w-full">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
