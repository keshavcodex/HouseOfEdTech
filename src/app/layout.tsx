import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Compass } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "House of Edtech | House of EdTech",
  description: "A premium learning path builder for educators.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 max-w-screen-2xl items-center mx-auto px-4">
            <Link href="/" className="mr-6 flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105 group-active:scale-95">
                <Compass className="h-5 w-5" />
              </div>
              <span className="font-bold sm:inline-block tracking-tight text-xl">
                House of Edtech
              </span>
            </Link>
            <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
              <Link
                href="/paths"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Explore Paths
              </Link>
              <Link
                href="/paths/new"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Create Path
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <footer className="w-full border-t border-border/40 py-6 mt-12 bg-background/95">
          <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground">
            <p>
              Developed by <span className="font-semibold text-foreground">Keshav Kumar</span>
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="tel:+919939308433"
                className="hover:text-foreground transition-colors"
              >
                +91 9939308433
              </a>
              <a
                href="https://github.com/keshavcodex"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/keshavcodex/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
