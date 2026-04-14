import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import SmoothScroll from "../components/SmoothScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  title: "Souq Ayaj | Premium Supermarket",
  description: "Curated daily essentials in Shuwaikh Industrial Area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#FAF9F6]">
      <body className={`${inter.variable} ${playfair.variable} bg-[#FAF9F6] text-[#0A0A0A] font-sans antialiased overflow-x-hidden`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
