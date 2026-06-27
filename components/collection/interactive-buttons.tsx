"use client";

import { Trash2 } from "lucide-react";
import { deleteCollectionById } from "@/actions/collection";
import EditCollectionDialog from "../edit-collection-dialog";
import { Button } from "../ui/button";

export default function InteractiveButtons({ id }: { id: string }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <EditCollectionDialog buttonClassName="text-white hover:bg-accent hover:text-accent-foreground border-input" />

      <Button
        className="flex items-center justify-center gap-1.5 rounded-md border-destructive/20 bg-transparent py-1.5 text-xs transition-all hover:bg-destructive/10 hover:text-destructive"
        onClick={async () => await deleteCollectionById(id)}
        variant={"destructive"}
      >
        <Trash2 size={12} /> Delete
      </Button>
    </div>
  );
}
