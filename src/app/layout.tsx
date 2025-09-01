import "~/styles/globals.css";
import ClientShell from "../components/ClientShell";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import Footer from "~/components/Footer/Footer";
import localFont from "next/font/local";

// Manrope local font
const manrope = localFont({
  src: [
    { path: "../../public/Fonts/Manrope/static/Manrope-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../../public/Fonts/Manrope/static/Manrope-Light.ttf",      weight: "300", style: "normal" },
    { path: "../../public/Fonts/Manrope/static/Manrope-Regular.ttf",    weight: "400", style: "normal" },
    { path: "../../public/Fonts/Manrope/static/Manrope-Medium.ttf",     weight: "500", style: "normal" },
    { path: "../../public/Fonts/Manrope/static/Manrope-SemiBold.ttf",   weight: "600", style: "normal" },
    { path: "../../public/Fonts/Manrope/static/Manrope-Bold.ttf",       weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
});

// Inter from Google
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

// ✅ Only one default export allowed
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
