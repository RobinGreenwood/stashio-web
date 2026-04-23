"use client";

import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";

import WaveGlobe from "@/components/WaveGlobe";

import {
  siApplepodcasts,
  siMedium,
  siSubstack,
  siX,
  siYoutube,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";

function SimpleIconSvg({
  icon,
  className,
  "aria-label": ariaLabel,
}: {
  icon: SimpleIcon;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel ?? icon.title}
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

const HERO_SOURCE_ICONS = [
  { key: "youtube", icon: siYoutube },
  { key: "medium", icon: siMedium },
  { key: "x", icon: siX },
  { key: "podcasts", icon: siApplepodcasts },
  { key: "substack", icon: siSubstack },
] as const;

function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 md:px-10 py-5">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="text-lg font-medium tracking-tight">Home Plate</span>
      </div>
    </nav>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto animate-fade-in-up-delay-3">
      {/* Phone-like frame with cosmic visual */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10 border border-olive-200 bg-olive-200/50 p-5 flex flex-col justify-between items-center h-[600px]">
        <div className="flex justify-start items-center mt-2 w-full"></div>
        <WaveGlobe />

        <div className="flex justify-center items-center gap-2 w-full">
          <div className="flex-1 border border-zinc-300 bg-white rounded-xl space-y-2">
            <input
              type="text"
              placeholder="Ask your library"
              className="w-full flex-1 rounded-full px-3 py-2.5 text-base leading-relaxed text-zinc-400 placeholder:text-zinc-500 font-medium focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <div className="flex flex-row justify-between items-center w-full p-2">
              <div className="flex flex-row -space-x-2 items-center justify-start">
                {/* <span className="text-sm font-semibold text-zinc-400 me-2">
                  Sources
                </span> */}
                {HERO_SOURCE_ICONS.map(({ key, icon }) => (
                  <div
                    key={key}
                    className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-zinc-200 z-[key]"
                    title={icon.title}
                  >
                    <SimpleIconSvg
                      icon={icon}
                      className="size-3 text-black"
                      aria-label={icon.title}
                    />
                  </div>
                ))}
                {/* <div className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-white shadow-lg z-[key]">
                  <Plus className="size-4 text-zinc-400" />
                </div> */}
              </div>

              <button className="rounded-full bg-white size-8 bg-zinc-800 text-zinc-100 shadow-sm transition-opacity hover:opacity-90 cursor-pointer flex items-center justify-center">
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>

        {/* <div className="aspect-[3/4] relative overflow-hidden bg-zinc-950">
          
          <img
            src="/image-landscape.webp"
            alt=""
            className="absolute inset-0 z-0 w-full h-full object-cover"
          />
         
          <div className="absolute inset-0 z-[1] bg-gradient-to-tr from-violet-600/40 via-transparent to-rose-500/30" />
          <div className="absolute inset-0 z-[1] bg-gradient-to-bl from-cyan-500/20 via-transparent to-fuchsia-600/25" />

         
          <div className="absolute top-1/4 left-1/3 z-[1] w-32 h-32 rounded-full bg-violet-500/30 blur-3xl animate-glow" />
          <div
            className="absolute top-1/2 right-1/4 z-[1] w-24 h-24 rounded-full bg-rose-500/25 blur-2xl animate-glow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/3 left-1/4 z-[1] w-20 h-20 rounded-full bg-cyan-400/20 blur-2xl animate-glow"
            style={{ animationDelay: "2s" }}
          />

         
          <div className="absolute left-[3%] right-[3%] bottom-[3%] z-[2]">
            <div className="rounded-2xl border border-white/25 bg-white backdrop-blur-md p-4 shadow-lg shadow-black/20">
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="hero-prompt" className="sr-only">
                  Ask your library
                </label>
                <textarea
                  id="hero-prompt"
                  rows={3}
                  placeholder="Use my saved articles to help me..."
                  className="w-full resize-none rounded-xl border border-zinc-300 bg-zinc-200/20 px-3 py-2.5 text-sm leading-relaxed text-zinc-400 placeholder:text-zinc-500 font-medium focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </form>
              
            </div>
          </div>

        
          <div className="absolute top-0 left-0 right-0 z-[2] h-16 bg-gradient-to-b from-white/10 to-transparent" />
        </div> */}
      </div>
    </div>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-600 animate-fade-in-up">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-emerald-500"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
        You&apos;re on the list. We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
    >
      {/* <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 h-12 px-5 rounded-full border border-zinc-200 bg-white text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-300 transition-all"
      /> */}
      <button
        type="submit"
        className="h-12 px-8 bg-foreground text-white font-medium rounded-full hover:bg-zinc-800 transition-colors whitespace-nowrap cursor-pointer"
      >
        Join the waitlist
      </button>
    </form>
  );
}

function FeatureTicker() {
  const features = [
    "Bookmark anything from the web",
    "AI-powered knowledge retrieval",
    "Ask questions, get answers from your library",
    "Build your second brain",
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-widest text-zinc-400 animate-fade-in-up-delay-3">
      {features.map((feature, i) => (
        <span key={i} className="flex items-center gap-3">
          {i > 0 && <span className="text-zinc-300">*</span>}
          {feature}
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Announcement bar */}

      <Navbar />

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left column */}
            <div className="flex flex-col gap-7">
              {/* Badge */}
              <div className="animate-fade-in-up">
                <span className="inline-flex items-center gap-2 text-sm bg-zinc-300/20 text-zinc-600 font-medium border border-zinc-200 rounded-full px-3 py-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Early access
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] leading-[1.08] tracking-tight font-normal animate-fade-in-up-delay-1">
                Expand your knowledge
                <br />
                <span className="text-zinc-400">with each bookmark.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-md animate-fade-in-up-delay-2">
                <span className="line-through">
                  The need to keep up with everything.
                </span>{" "}
                <br />
                Save articles, interviews and ideas that fascinate you, and ask
                big questions when they come up.
              </p>

              {/* Waitlist form */}
              <div id="waitlist" className="animate-fade-in-up-delay-3">
                <WaitlistForm />
              </div>
            </div>

            {/* Right column — visual */}

            <HeroVisual />
          </div>

          {/* Feature ticker */}
          <div className="mt-16 md:mt-24 pt-8 border-t border-zinc-100">
            <FeatureTicker />
          </div>
        </div>
      </main>
    </div>
  );
}
