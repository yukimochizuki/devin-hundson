"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden rounded-md p-2 hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-primary">Devin Task Board</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-md p-2 hover:bg-accent">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 rounded-md p-2 hover:bg-accent"
            >
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                {session?.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="hidden md:block text-sm font-medium">
                {session?.user?.name}
              </span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-card shadow-lg">
                <div className="p-2">
                  <button
                    onClick={handleSignOut}
                    className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                  >
                    ログアウト
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
