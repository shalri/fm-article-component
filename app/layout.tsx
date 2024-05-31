import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Article Component | FScode",
  description: "A Frontend Mentor Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} grid min-h-dvh grid-cols-1 place-items-center bg-ac-light-grayish-blue px-6 text-body font-normal`}
      >
        {children}
      </body>
    </html>
  );
}
