import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientProviders } from "./components/ClientProviders";
import { DashboardLayout } from "@/components/DashboardLayout";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "TravelBot AI Dashboard",
  description: "Next.js TravelBot AI Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DashboardLayout />
          <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
