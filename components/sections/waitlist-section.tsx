"use client";

import Link from "next/link";

export function WaitlistSection() {
  return (
    <section id="waitlist" className="bg-foreground">
      {/* CTA Content */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-background md:text-4xl lg:text-5xl">
            Be First to Explore SafarUp
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-background/70">
            Join our waitlist and be among the first to experience AI-powered travel planning for Bihar and beyond.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="mailto:safaruphq@gmail.com?subject=Join%20SafarUp%20Waitlist"
              className="inline-flex items-center justify-center rounded-full bg-background px-8 py-4 text-sm font-medium text-foreground transition-all hover:opacity-90"
            >
              Join Waitlist
            </Link>
            <Link
              href="#destinations"
              className="inline-flex items-center justify-center rounded-full border border-background/30 px-8 py-4 text-sm font-medium text-background transition-all hover:bg-background/10"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
