import { ArrowLeft, Calendar, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCollectionById } from "@/actions/collection";
import InteractiveButtons from "@/components/collection/interactive-buttons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PLATFORM_CONFIG } from "@/config/platform-config";
import { STATUS_CONFIG } from "@/config/status-config";
import { cn } from "@/lib/utils";

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const gameInformation = await getCollectionById(id);

  if (!gameInformation) {
    redirect("/");
  }

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const PlatformIcon = PLATFORM_CONFIG[gameInformation.platform].icon;
  const platformLabel = PLATFORM_CONFIG[gameInformation.platform].label;
  const platformClassName = PLATFORM_CONFIG[gameInformation.platform].className;

  const StatusIcon = STATUS_CONFIG[gameInformation.status].icon;
  const statusLabel = STATUS_CONFIG[gameInformation.status].label;
  const statusClassName = STATUS_CONFIG[gameInformation.status].className;

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-64 overflow-hidden sm:h-80">
        <Image
          alt={gameInformation.title}
          className="h-full w-full object-cover"
          height={100}
          src={gameInformation.imageURL}
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
              alt={gameInformation.title}
              className="h-full w-full object-cover"
              height={100}
              src={gameInformation.imageURL}
              unoptimized
              width={100}
            />
          </div>
          <div className="flex-1 pt-2 sm:pt-6">
            <h1 className="mb-3 font-bold font-display text-3xl text-foreground sm:text-4xl">
              {gameInformation.title}
            </h1>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-medium text-xs",
                  platformClassName
                )}
              >
                <PlatformIcon size={12} />
                {platformLabel}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-medium text-xs",
                  statusClassName
                )}
              >
                <StatusIcon size={12} />
                {statusLabel}
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

            <InteractiveButtons gameInformation={gameInformation} id={id} />
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
                <p className="font-bold font-heading text-2xl">
                  {gameInformation.playtime}h
                </p>
                <p className="text-muted-foreground text-xs">Total Playtime</p>
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-medium">
                  {gameInformation.completion}%
                </span>
              </div>
              <Progress
                className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20"
                value={gameInformation.completion}
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
                <span className="font-medium">
                  {PLATFORM_CONFIG[gameInformation.platform].label}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium">
                  {STATUS_CONFIG[gameInformation.status].label}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Added</span>
                <span className="flex items-center gap-1 font-medium">
                  <Calendar size={12} />{" "}
                  {dateFormatter.format(gameInformation.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {gameInformation.note && (
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-3 font-heading font-semibold text-foreground">
              Personal Notes
            </h3>
            <p className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
              {gameInformation.note}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
