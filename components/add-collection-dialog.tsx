import { Gamepad2, Loader, Plus, Star } from "lucide-react";
import { useState } from "react";
import { addCollection } from "@/actions/collection";
import type { Platform, Status } from "@/app/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";

export default function AddCollectionDialog({
  formClassName,
  buttonClassName,
  userId,
}: {
  formClassName?: string;
  buttonClassName?: string;
  userId: string;
}) {
  const [openState, setOpenState] = useState(false);

  const [completion, setCompletion] = useState<number[]>([0]);
  const [score, setScore] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [platform, setPlatform] = useState<Platform>("PC");
  const [status, setStatus] = useState<Status>("PLAYING");
  const [playtime, setPlaytime] = useState<number>(0);
  const [note, setNote] = useState<string>("");

  const [btnLoading, setBtnLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBtnLoading(true);

    await addCollection({
      title,
      completion: Number(completion),
      imageURL,
      platform,
      playtime,
      score,
      status,
      note,
      userId,
    });

    setOpenState(false);
    setBtnLoading(false);
    setCompletion([0]);
    setScore(0);
    setTitle("");
    setImageURL("");
    setPlatform("PC");
    setStatus("PLAYING");
    setPlaytime(0);
    setNote("");
  };

  return (
    <Dialog onOpenChange={setOpenState} open={openState}>
      <form
        className={formClassName}
        id="add-collection-form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <DialogTrigger asChild>
          <Button
            className={cn(
              "gap-2 rounded-lg px-4 py-4.5 shadow hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring-ring",
              buttonClassName
            )}
          >
            <Plus className="hidden sm:inline" size={12} /> Add Game
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-x-1.5 text-center text-xl">
              <Gamepad2 className="text-primary" /> Add Game
            </DialogTitle>
            {/* <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription> */}
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="game-title">Game Title *</Label>
              <Input
                className="bg-secondary"
                form="add-collection-form"
                id="game-title"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g, Cyberpunk 2077"
                required
                value={title}
              />
            </Field>
            <Field>
              <Label htmlFor="cover-image-URL">Cover Image URL</Label>
              <Input
                className="bg-secondary"
                form="add-collection-form"
                id="cover-image-URL"
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="https://example.com/cover.jpg"
                // required
                value={imageURL}
              />
            </Field>
            <Field>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label>Platform *</Label>
                  <Select
                    defaultValue="pc"
                    form="add-collection-form"
                    onValueChange={(value) => setPlatform(value as Platform)}
                    required
                    value={platform}
                  >
                    <SelectTrigger className="w-full bg-secondary">
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="PC">PC</SelectItem>
                        <SelectItem value="PLAYSTATION">PlayStation</SelectItem>
                        <SelectItem value="XBOX">Xbox</SelectItem>
                        <SelectItem value="NINTENDO_SWITCH">
                          Nintendo Switch
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label>Status *</Label>
                  <Select
                    defaultValue="playing"
                    form="add-collection-form"
                    onValueChange={(value) => setStatus(value as Status)}
                    required
                    value={status}
                  >
                    <SelectTrigger className="w-full bg-secondary">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="PLAYING">Playing</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="BACKLOG">Backlog</SelectItem>
                        <SelectItem value="WISHLIST">Wishlist</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Field>

            <Field>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label>Hours Played</Label>
                  <Input
                    className="bg-secondary"
                    defaultValue={0}
                    form="add-collection-form"
                    onChange={(e) => setPlaytime(Number(e.target.value))}
                    required
                    type="number"
                    value={playtime}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label>Completion %</Label>
                  <div className="flex gap-x-2">
                    <Slider
                      className="flex-1"
                      form="add-collection-form"
                      max={100}
                      onValueChange={setCompletion}
                      step={1}
                      value={completion}
                    />
                    <span className="w-10 text-right text-muted-foreground text-sm">
                      {completion}%
                    </span>
                  </div>
                </div>
              </div>
            </Field>

            <div className="flex flex-col gap-y-2">
              <Label>Personal Rating</Label>
              <div className="flex">
                {Array.from({ length: 5 }, (_, index) => (
                  <button
                    form="add-collection-form"
                    key={index}
                    onClick={() => setScore(index + 1)}
                    type="button"
                  >
                    <Star
                      className={
                        index < score
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-transparent text-muted-foreground/30"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <Field>
              <Label>Notes</Label>
              <Textarea
                className="min-h-15 bg-secondary"
                form="add-collection-form"
                onChange={(e) => setNote(e.target.value)}
                placeholder="Favorite moments, things to remember..."
                rows={3}
                value={note}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="bg-transparent max-sm:flex-row">
            <DialogClose asChild>
              <Button
                className="flex-1 border-border bg-transparent max-sm:py-2"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="flex-1 max-sm:py-2"
              disabled={btnLoading}
              form="add-collection-form"
              type="submit"
            >
              {btnLoading ? (
                <span>
                  <Loader className="animate-spin" />
                </span>
              ) : (
                "Add Game"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
