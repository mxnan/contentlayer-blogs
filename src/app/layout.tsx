import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/navigation/footer";
import dynamic from "next/dynamic";
import { Anybody as FontSans } from "next/font/google";

// dynamic navbar for  animations
const DynamicNavbar = dynamic(() => import("@/components/navigation/navbar"), {
  ssr: false,
});
////////////////////////
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

//metadata
export const metadata: Metadata = {
  title: {
    template: "%s || mxnan",
    default: "mxnan.com",
  },
  description: `Personal website @mxnan with some blogs and creating some custom react components for usage. Using Nextjs, Tailwind, Contentlayer, Framer-motion and more.`,
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  metadataBase: new URL("https://mxnan.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mxnan.com",
    siteName: "mxnan.com",
    images: [
      {
        url: "/open-graph.jpg",
        width: 1200,
        height: 800,
        alt: "mxnan.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://mxnan.com",
    creator: "@etc_etcx",
    images: ["/open-graph.jpg"],
  },
  keywords: [
    "Next.js",
    "React",
    "Web Development",
    "Tailwind CSS",
    "Framer Motion",
    "Contentlayer",
    "Components",
    "Blog",
    "Mdx",
  ],
  authors: [{ name: "Manan", url: "https://mxnan.com" }],
  creator: "Manan",
  publisher: "mxnan.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

//layout function
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn("relative w-full font-sans", fontSans.variable)}>
        <Providers>
          <DynamicNavbar />
          <main className="pt-28 pb-8 mx-auto container w-full">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
