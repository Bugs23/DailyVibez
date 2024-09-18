import { Fugaz_One, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "DailyVibez",
  description: "Track your vibe everyday of the year.",
};

export default function RootLayout({ children }) {

  const Header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <h1 className={`text-base sm:text-lg textGradient ${fugaz.className}`}>Daily Vibez</h1>
      <div className="flex items-center justify-between">
        Placeholder cta || stats
      </div>
    </header>
  )

  const Footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p>&copy;{new Date().getFullYear()} <span className={`text-indigo-500 ${fugaz.className}`}>Built with</span> ❤️</p>
    </footer>
  )

  return (
    <html lang="en">
      <body className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 ${inter.className}`}>
        {Header}
        {children}
        {Footer}
      </body>
    </html>
  );
}
