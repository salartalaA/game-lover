import { Clock, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { deleteCollectionById } from "@/actions/collection";
import { cn } from "@/lib/utils";
import type { GameCardItem } from "@/types/collection";
import EditCollectionDialog from "./edit-collection-dialog";
import { Button } from "./ui/button";

export default function GameCard({
  id,
  title,
  imageURL,
  status,
  Icon,
  platform,
  PlatformIcon,
  score,
  playtime,
  statusColor,
  platformColor,
}: GameCardItem) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-primary/5 hover:shadow-xl">
      <Link className="block" href={`collection/${id}`}>
        <div className="relative aspect-3/4 overflow-hidden bg-secondary">
          <Image
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            height={100}
            src={imageURL}
            unoptimized
            width={100}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-medium text-xs",
                statusColor
              )}
            >
              <Icon size={12} />
              {status}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-y-3 p-4">
        <Link href={"game-url"}>
          <h3 className="truncate font-heading font-semibold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-medium text-xs",
              platformColor
            )}
          >
            <PlatformIcon size={13} /> {platform}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, index) => {
              const filled = index < score;

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
                    size={14}
                  />
                </button>
              );
            })}
          </div>
          <span className="flex items-center gap-1 text-muted-foreground text-xs">
            <Clock size={12} /> {playtime}h
          </span>
        </div>
        <div className="flex items-center gap-1 border-border border-t pt-1">
          <EditCollectionDialog formClassName="w-1/2" />

          <Button
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-muted-foreground text-xs transition-all hover:bg-destructive/10 hover:text-destructive"
            onClick={async () => await deleteCollectionById(id)}
            variant={"ghost"}
          >
            <Trash2 size={12} /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
