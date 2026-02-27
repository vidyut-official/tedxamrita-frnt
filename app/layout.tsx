import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import { Bungee } from "next/font/google";
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
});

export const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bungee",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata = {
  title: "TEDx Amritapuri",
  description: "Beyond the visible",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
            <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-sans bg-black text-white`}>

        <div className="pt-16 md:pt-20">{children}</div>
      </body>
    </html>
  );
}