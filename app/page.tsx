"use client";

import { SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";

export default function Home() {
  const { isSignedIn } = useUser();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Card>{isSignedIn ? <UserButton /> : <SignUpButton />}</Card>
    </div>
  );
}
