import type { Metadata } from "next";
import { Anybody, Cuprum } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import TopNav from "@/components/top-nav";
import Footer from "@/components/footer";

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
    template: "%s || mxnan",
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
          <TopNav />
          <main className="py-12 mx-auto container w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
