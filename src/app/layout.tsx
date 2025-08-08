import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import NavBar from "~/components/NavBar";

export const metadata: Metadata = {
  title: "Project Unknown",
  description: "Project Unknown",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
