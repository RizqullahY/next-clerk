"use client";

import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Navbar from "@/components/general/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="shadow-md bg-gray-900 text-white">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Navbar />
          <div>{isSignedIn ? <UserButton /> : <SignUpButton />}</div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-8 sm:p-16 grid gap-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">© 2025 raflyasliGalek. All rights reserved.</p>
      </footer>
    </div>
  );
}
