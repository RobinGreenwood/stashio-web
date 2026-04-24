"use client";

import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

const USE_CASES = [
  {
    text: "What rules were mentioned for coming up with a brand name in @brand",
    badgeText: "brand",
    pillTitle: "Brand Guidelines",
    accent: "lime" as const,
  },
  {
    text: "Edit this text based on my preferences in @copywriting",
    badgeText: "copywriting",
    pillTitle: "Copywriting Style",
    accent: "amber" as const,
  },
];

const TYPE_SPEED = 50;
const PILL_DELAY = 200;
const INITIAL_PAUSE = 1500;
const FADE_OUT_DURATION = 800;
const PAUSE_AFTER_COMPLETE = 2000;
const PAUSE_BETWEEN_CASES = 1500;

export default function TypewriterHero() {
  const textDisplayRef = useRef<HTMLDivElement>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const pillTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let isTyping = false;
    let currentUseCaseIndex = 0;

    function addTimeout(fn: () => void, delay: number) {
      const id = setTimeout(fn, delay);
      timeouts.push(id);
      return id;
    }

    function typeWriter() {
      if (isTyping) return;
      isTyping = true;

      const textDisplay = textDisplayRef.current;
      const pillsContainer = pillsContainerRef.current;
      const pill = pillRef.current;

      if (!textDisplay || !pillsContainer || !pill) {
        isTyping = false;
        return;
      }

      const useCase = USE_CASES[currentUseCaseIndex];
      const { text, badgeText } = useCase;
      let currentIndex = 0;
      let currentText = "";
      let badgeCompleted = false;

      textDisplay.innerHTML = '<span class="tw-cursor" id="tw-cursor"></span>';
      pillsContainer.dataset.visible = "false";
      pill.dataset.show = "false";
      pill.dataset.accent = useCase.accent;

      if (pillTitleRef.current)
        pillTitleRef.current.textContent = useCase.pillTitle;

      function type() {
        if (!textDisplay) return;

        if (currentIndex < text.length) {
          currentText += text[currentIndex];

          const cursorEl = textDisplay.querySelector("#tw-cursor");
          if (cursorEl) cursorEl.remove();

          let displayHTML = "";

          if (currentText.includes("@")) {
            const atIndex = text.indexOf("@");
            const beforeBadge = text.substring(0, atIndex);
            const badgeStartInCurrent = currentText.indexOf("@");
            const badgeSoFar = currentText.substring(badgeStartInCurrent);
            const afterBadgeStart = atIndex + badgeText.length + 1;
            const afterBadge =
              currentText.length > afterBadgeStart
                ? currentText.substring(afterBadgeStart)
                : "";

            displayHTML =
              beforeBadge +
              '<span class="tw-badge tw-badge--' +
              useCase.accent +
              '">' +
              badgeSoFar +
              "</span>" +
              afterBadge;

            const badgeInText = currentText.substring(
              currentText.indexOf("@") + 1,
            );
            if (badgeInText === badgeText && !badgeCompleted) {
              badgeCompleted = true;

              addTimeout(() => {
                if (pillsContainer) {
                  pillsContainer.dataset.visible = "true";
                  addTimeout(() => {
                    if (pill) pill.dataset.show = "true";
                  }, 100);
                }
              }, PILL_DELAY);
            }
          } else {
            displayHTML = currentText;
          }

          textDisplay.innerHTML = displayHTML;

          const newCursor = document.createElement("span");
          newCursor.className = "tw-cursor";
          newCursor.id = "tw-cursor";
          textDisplay.appendChild(newCursor);

          currentIndex++;
          addTimeout(type, TYPE_SPEED);
        } else {
          isTyping = false;
          addTimeout(fadeOutAndNext, PAUSE_AFTER_COMPLETE);
        }
      }

      type();
    }

    function fadeOutAndNext() {
      const textDisplay = textDisplayRef.current;
      const pillsContainer = pillsContainerRef.current;
      const pill = pillRef.current;

      if (!textDisplay || !pillsContainer || !pill) return;

      textDisplay.dataset.fading = "true";
      pillsContainer.dataset.visible = "false";
      pill.dataset.show = "false";

      addTimeout(() => {
        textDisplay.innerHTML =
          '<span class="tw-cursor" id="tw-cursor"></span>';
        textDisplay.dataset.fading = "false";

        currentUseCaseIndex = (currentUseCaseIndex + 1) % USE_CASES.length;

        addTimeout(() => {
          typeWriter();
        }, PAUSE_BETWEEN_CASES);
      }, FADE_OUT_DURATION);
    }

    addTimeout(typeWriter, INITIAL_PAUSE);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="z-10 mx-auto w-full max-w-2xl rounded-3xl bg-white py-3 px-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div className="flex items-center gap-3">
        <Search className="size-4 shrink-0 text-zinc-400 -mt-0.5" />
        <div
          ref={textDisplayRef}
          data-fading="false"
          className="min-h-[27px] flex-1 text-base leading-[1.5] text-[#1a1a1a] transition-opacity duration-500 ease-linear data-[fading=true]:opacity-0"
        >
          <span className="tw-cursor" id="tw-cursor" />
        </div>
      </div>

      <div
        ref={pillsContainerRef}
        data-visible="false"
        className="mt-0 max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] data-[visible=true]:mt-4 data-[visible=true]:max-h-[300px] data-[visible=true]:opacity-100"
      >
        <div
          ref={pillRef}
          data-show="false"
          data-accent="lime"
          className="group inline-flex -translate-y-[10px] scale-95 items-center gap-1 rounded-md border border-transparent px-2 py-1.5 opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] data-[accent=lime]:border-lime-200 data-[accent=lime]:bg-lime-50 data-[accent=amber]:border-amber-200 data-[accent=amber]:bg-amber-50 data-[show=true]:translate-y-0 data-[show=true]:scale-100 data-[show=true]:opacity-100"
        >
          <span className="size-1.5 shrink-0 rounded-full group-data-[accent=lime]:bg-lime-500 group-data-[accent=amber]:bg-amber-500" />
          <div
            ref={pillTitleRef}
            className="text-sm font-medium group-data-[accent=lime]:text-lime-700 group-data-[accent=amber]:text-amber-800"
          >
            Brand Guidelines
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end">
        <div className="flex size-8 items-center justify-center rounded-full bg-neutral-900 text-white">
          ↑
        </div>
      </div>
    </div>
  );
}
