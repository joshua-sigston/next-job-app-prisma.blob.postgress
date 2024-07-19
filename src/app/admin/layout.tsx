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
      <div className="fixed right-[50%] top-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      {userId && children}
    </ClerkProvider>
  );
}
