import { Anton_SC, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Head from "./head";
import Logout from "@/components/Logout";

const inter = Inter({ subsets: ["latin"] });
const anton = Anton_SC({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "DailyVibez",
  description: "Track your vibe everyday of the year.",
};

export default function RootLayout({ children }) {

  const Header = (
    <header className="pt-6 pb-8 px-4 flex items-center justify-between gap-4">
      <Link href={"/"}>
        <h1 className={`text-xl sm:text-2xl textGradient ${anton.className}`}>Daily Vibez</h1>
      </Link>
      <Logout />
    </header>
  )

  const Footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p>&copy;{new Date().getFullYear()} <span className={`textGradient ${anton.className}`}>Raymond Urrutia</span></p>
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${inter.className}`}>
          {Header}
          {children}
          {Footer}
        </body>
      </AuthProvider>
    </html>
  );
}
