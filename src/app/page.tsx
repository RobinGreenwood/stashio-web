"use client";

import Link from "next/link";

import { BrowserWindowBackdrop } from "@/components/BrowserWindowBackdrop";
import TypewriterHero from "@/components/TypewriterHero";

function Navbar() {
  return (
    <nav className="relative z-10 w-full flex items-center justify-between px-6 md:px-10 py-5 max-w-6xl mx-auto">
      <div className="flex items-center gap-1">
        <img
          src="/logo.svg"
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0"
        />
        <span className="text-lg font-bold tracking-tight">Stashio</span>
      </div>
    </nav>
  );
}

function WaitlistForm() {
  return (
    <a
      href="https://tally.so/r/kd061R"
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 font-medium text-white transition-colors hover:bg-zinc-800"
    >
      Join the waitlist
    </a>
  );
}

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="relative z-10 flex flex-1 items-center">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12 md:px-10 md:py-20">
          <div className="flex flex-col gap-7 items-center justify-center pb-22">
            {/* Badge */}
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 text-sm bg-lime-300/20 text-zinc-600 font-medium border border-lime-500/30 rounded-full px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-lime-400" />
                Public beta
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.08] tracking-tight font-bold animate-fade-in-up-delay-1">
              Chat with your bookmarks
            </h1>

            <div id="waitlist" className="animate-fade-in-up-delay-3">
              <WaitlistForm />
            </div>
          </div>

          {/* Right column — hero animation */}
          <div className="animate-fade-in-up-delay-3 relative z-10 h-44">
            <div
              className="pointer-events-none absolute inset-x-0 top-10 bottom-0 z-0 [mask-image:linear-gradient(to_bottom,#000_0%,#0000_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#0000_100%)]"
              aria-hidden
            >
              <BrowserWindowBackdrop />
            </div>
            <div className="absolute inset-0 z-10">
              <TypewriterHero />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center mt-12">
            <p className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-2xl animate-fade-in-up-delay-2 text-center">
              Save what fascinates you. Chat with it when you need it.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center mt-12">
            <p className="text-3xl font-bold text-zinc-900 max-w-2xl animate-fade-in-up-delay-2 text-center">
              Your online activity is a reflection of your unique taste. Now you
              can interact with it as a unique knowledge base.
            </p>
          </div>
        </div>
      </main>

      <footer className="relative w-full border-t border-border py-8">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-3 gap-8 px-6 md:px-10">
          <div className="col-span-1 flex flex-col gap-2">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
              Company
            </p>
            <p className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Nectar Labs UG (haftungsbeschränkt)
            </p>
          </div>
          <div className="col-span-1 flex flex-col gap-2">
            <p
              className="text-xs font-semibold text-zinc-500 uppercase tracking-widest
"
            >
              {" "}
              Connect
            </p>
            <p className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              X (Twitter){" "}
            </p>
          </div>

          <div className="col-span-1 flex flex-col gap-2">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
              Resources
            </p>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Browser Extension
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
