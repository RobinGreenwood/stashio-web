import type { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy — Stash",
  description:
    "What Stash collects when you save pages, what we do not collect, and how your data is handled.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-12 md:py-16">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Home
        </Link>

        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle className="font-serif text-2xl font-normal tracking-tight sm:text-3xl">
              Privacy Policy
            </CardTitle>
            <CardDescription>Last updated: April 2026</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8 pt-6">
            <section className="flex flex-col gap-2">
              <h2 className="font-heading text-base font-medium text-foreground">
                What Stash collects
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                When you click the Stash extension to save a page, the
                extension reads the current tab&apos;s URL and page title.
                That&apos;s it. This information is sent to your Stash account so
                you can save and organize it.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                The extension also stores your Stash API URL in Chrome&apos;s
                sync storage so your settings carry across your browsers.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="font-heading text-base font-medium text-foreground">
                What Stash does not collect
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Stash does not collect your name, email address, location,
                browsing history, or any information about pages you visit
                without explicitly saving them. Stash does not use analytics,
                advertising trackers, or cookies.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="font-heading text-base font-medium text-foreground">
                Where your data goes
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Saved pages are stored in your own Stash account. Stash does not
                sell, share, or transfer your data to third parties.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="font-heading text-base font-medium text-foreground">
                Changes to this policy
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                If we make material changes to this policy, we&apos;ll update the
                date above and note it on this page.
              </p>
            </section>

            <section className="flex flex-col gap-2">
              <h2 className="font-heading text-base font-medium text-foreground">
                Contact
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Questions? Reach us at{" "}
                <a
                  href="mailto:hello@trystash.io"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  hello@trystash.io
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
