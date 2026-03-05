import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "नेपाल निर्वाचन परिणाम २०८२ — Live Election Results",
  description:
    "Live election results for Nepal's House of Representatives Election 2082. Real-time vote counts, party-wise analysis, and constituency-level results.",
  keywords:
    "Nepal election, election results 2082, Nepal votes, live results, प्रतिनिधि सभा निर्वाचन, नेपाल निर्वाचन",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ne">
      <body className={`${inter.variable} ${notoDevanagari.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
