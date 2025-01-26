"use client";

import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Navbar from "@/components/general/navbar";
import { ModeToggle } from "./mode-toggle";

const SiteHeader = () => {
  const { isSignedIn } = useUser();
  return (
    <header className="shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Navbar />
        <div className="flex gap-x-4">
          <ModeToggle />
          {isSignedIn ? <UserButton /> : <SignUpButton />}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
