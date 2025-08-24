import "~/styles/globals.css";
import ClientShell from "../components/ClientShell";
import { Suspense } from "react";
import { Manrope } from "next/font/google";
import { Inter } from "next/font/google";
import Footer from "~/components/Footer/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <Suspense fallback={null}>
          <ClientShell>
            {children}
            <Footer />
          </ClientShell>
        </Suspense>
      </body>
    </html>
  );
}
