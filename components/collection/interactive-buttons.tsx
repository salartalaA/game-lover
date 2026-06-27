"use client";

import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteCollectionById } from "@/actions/collection";
import type { Collection } from "@/app/generated/prisma/client";
import EditCollectionDialog from "../edit-collection-dialog";
import { Button } from "../ui/button";

export default function InteractiveButtons({
  gameInformation,
  id,
}: {
  gameInformation: Collection;
  id: string;
}) {
  const [btnLoading, setBtnLoading] = useState(false);

  const handleDeleteCollection = async (id: string) => {
    setBtnLoading(true);
    await deleteCollectionById(id);
  };

  return (
    <div className="mt-4 flex items-center gap-3">
      <EditCollectionDialog
        buttonClassName="text-white hover:bg-accent hover:text-accent-foreground border-input"
        collection={gameInformation}
        id={id}
      />

      <Button
        className="flex items-center justify-center gap-1.5 rounded-md border-destructive/20 bg-transparent py-1.5 text-xs transition-all hover:bg-destructive/10 hover:text-destructive"
        disabled={btnLoading}
        onClick={() => handleDeleteCollection(id)}
        variant={"destructive"}
      >
        {btnLoading ? (
          <span>
            <Loader className="animate-spin" />
          </span>
        ) : (
          <>
            <Trash2 size={12} /> Delete
          </>
        )}
      </Button>
    </div>
  );
}
