import { Gamepad2, Pencil, Star } from "lucide-react";
import { useState } from "react";
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

export default function EditCollectionDialog({
  formClassName,
  buttonClassName,
}: {
  formClassName?: string;
  buttonClassName?: string;
}) {
  const [completion, setCompletion] = useState<number[]>([0]);
  const [score, setScore] = useState<number>(0);

  return (
    <Dialog>
      <form className={formClassName}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "mx-auto flex w-full flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-muted-foreground text-xs transition-all hover:bg-primary/10 hover:text-primary",
              buttonClassName
            )}
            variant={"ghost"}
          >
            <Pencil size={12} /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-x-1.5 text-center text-xl">
              <Gamepad2 className="text-primary" /> Edit Game
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
                defaultValue="Cyberpunk 2077"
                id="game-title"
                name="game-title"
              />
            </Field>
            <Field>
              <Label htmlFor="cover-image-URL">Cover Image URL</Label>
              <Input
                className="bg-secondary"
                id="cover-image-URL"
                name="cover-image-URL"
              />
            </Field>
            <Field>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label>Platform *</Label>
                  <Select defaultValue="pc">
                    <SelectTrigger className="w-full bg-secondary">
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="pc">PC</SelectItem>
                        <SelectItem value="playstation">PlayStation</SelectItem>
                        <SelectItem value="xbox">Xbox</SelectItem>
                        <SelectItem value="nintendo-switch">
                          Nintendo Switch
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label>Status *</Label>
                  <Select defaultValue="playing">
                    <SelectTrigger className="w-full bg-secondary">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="playing">Playing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="backlog">Backlog</SelectItem>
                        <SelectItem value="wishlist">Wishlist</SelectItem>
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
                    defaultValue={"85"}
                    type="number"
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label>Completion %</Label>
                  <div className="flex gap-x-2">
                    <Slider
                      className="flex-1"
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
                placeholder="Favorite moments, things to remember..."
                rows={3}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="bg-transparent">
            <DialogClose asChild>
              <Button
                className="flex-1 border-border bg-transparent"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button className="flex-1" type="submit">
              Add / Update Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
