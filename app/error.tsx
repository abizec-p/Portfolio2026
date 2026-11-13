"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
        Error
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-neutral-600 dark:text-neutral-400">
        An unexpected error occurred while loading this page. You can try again
        or head back home.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium transition hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
        >
          Back to home
        </Link>
      </div>

      {error.digest && (
        <p className="mt-6 text-xs text-neutral-400">
          Error ID: {error.digest}
        </p>
      )}
    </main>
  );
}