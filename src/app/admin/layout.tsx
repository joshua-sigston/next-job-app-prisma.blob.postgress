import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
// yXw3UPcrc8KWuWq

export const metadata: Metadata = {
  title: "Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      {!userId && (
        <div className="grid h-[70vh] place-content-center">
          <div className="rounded-md bg-primary px-4 py-2 text-white shadow-md">
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      )}
      {userId && (
        <div className="flex w-full max-w-[1200px] justify-around bg-muted py-3">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <Link href="/admin">Dashboard</Link>
        </div>
      )}
      {userId && children}
    </ClerkProvider>
  );
}
