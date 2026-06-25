"use client";

import { ArrowLeft, Calendar, Clock, Monitor, Play, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import InteractiveButtons from "@/components/collection/interactive-buttons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function GamePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 overflow-hidden sm:h-80">
        <Image
          alt="Cyberpunk 2077"
          className="h-full w-full object-cover"
          height={100}
          src={"https://images.unsplash.com/photo-1542751371-adc38448a05e"}
          unoptimized
          width={100}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link href={"/"}>
            <Button className="rounded-md bg-secondary/50 p-4 backdrop-blur-md hover:bg-secondary/80">
              <ArrowLeft />
              Back
            </Button>
          </Link>
        </div>
      </div>
      <main className="relative z-10 mx-auto -mt-24 max-w-4xl px-4 pb-12 sm:px-6">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row">
          <div className="h-48 w-36 shrink-0 overflow-hidden rounded-xl border-2 border-border bg-card shadow-2xl shadow-black/50 sm:h-60 sm:w-44">
            <Image
              alt="Cyberpunk 2077"
              className="h-full w-full object-cover"
              height={100}
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
              unoptimized
              width={100}
            />
          </div>
          <div className="flex-1 pt-2 sm:pt-6">
            <h1 className="mb-3 font-bold font-display text-3xl text-foreground sm:text-4xl">
              Cyberpunk 2077
            </h1>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 font-medium text-blue-400 text-xs">
                <Monitor size={12} />
                PC
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 font-medium text-emerald-400 text-xs">
                <Play size={12} />
                Playing
              </span>
            </div>

            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, index) => {
                const filled = index < 4;

                return (
                  <button
                    className="cursor-default"
                    disabled
                    key={index}
                    type="button"
                  >
                    <Star
                      className={
                        filled
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-transparent text-muted-foreground/30"
                      }
                      size={20}
                    />
                  </button>
                );
              })}
            </div>

            <InteractiveButtons />
          </div>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <h3 className="font-heading font-semibold text-foreground">
              Playtime Statistics
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Clock className="text-primary" size={18} />
              </div>
              <div>
                <p className="font-bold font-heading text-2xl">85h</p>
                <p className="text-muted-foreground text-xs">Total Playtime</p>
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-medium">38%</span>
              </div>
              <Progress
                className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20"
                value={38}
              />
            </div>
          </div>
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <h3 className="font-heading font-semibold text-foreground">
              Details
            </h3>
            <div className="flex flex-col gap-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Platform</span>
                <span className="font-medium">PC</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium">Playing</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Added</span>
                <span className="flex items-center gap-1 font-medium">
                  <Calendar size={12} /> Jun 15, 2026
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-3 font-heading font-semibold text-foreground">
            Personal Notes
          </h3>
          <p className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
            Incredible atmosphere and storytelling. The Night City feels alive.
            Currently exploring all the side quests.
          </p>
        </div>
      </main>
    </div>
  );
}
