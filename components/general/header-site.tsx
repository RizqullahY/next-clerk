"use client";

import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Navbar from "@/components/general/navbar";

const HeaderSite = () => {
  const { isSignedIn } = useUser();
  return (
    <header className="shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Navbar />
        <div>{isSignedIn ? <UserButton /> : <SignUpButton />}</div>
      </div>
    </header>
  );
};

export default HeaderSite;
