import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "TEDx Amritapuri",
  description: "Beyond the visible",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <div className="pt-20">{children}</div>
      </body>
    </html>
  );
}
