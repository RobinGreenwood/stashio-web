import { cn } from "@/lib/utils";

type BrowserWindowBackdropProps = {
  className?: string;
};

/**
 * Wireframe browser outline. The stroke color follows `currentColor`, so the
 * consumer controls the color via a text-* utility on `className` (default:
 * `text-zinc-200`).
 */
export function BrowserWindowBackdrop({
  className,
}: BrowserWindowBackdropProps) {
  return (
    <svg
      viewBox="0 0 1091 225"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden
      className={cn("h-auto w-full text-zinc-200", className)}
    >
      <rect x="0.5" y="0.5" width="1090" height="224" rx="9.5" />
      <rect x="8.5" y="40.5" width="1070" height="184" rx="7.5" />
      <path d="M79.0986 5.53906L204.23 6.08496C208.91 6.10536 212.693 9.905 212.693 14.585V26.7598C212.693 32.0093 216.952 36.2638 222.201 36.2598L1075.99 35.6045C1080.69 35.6009 1084.5 39.4076 1084.5 44.1045V216C1084.5 220.694 1080.69 224.5 1076 224.5H13C8.30558 224.5 4.5 220.694 4.5 216V44.0977C4.50009 39.4033 8.30563 35.5977 13 35.5977H61.0615C66.308 35.5974 70.5615 31.3442 70.5615 26.0977V14.0391C70.5617 9.33028 74.3899 5.51854 79.0986 5.53906Z" />
      <circle cx="17.5" cy="18.5" r="4.5" />
      <circle cx="34.5" cy="18.5" r="4.5" />
      <circle cx="51.5" cy="18.5" r="4.5" />
    </svg>
  );
}
