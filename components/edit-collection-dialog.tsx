// import { Gamepad2, Pencil, Star } from "lucide-react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Field, FieldGroup } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { cn } from "@/lib/utils";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Slider } from "./ui/slider";
// import { Textarea } from "./ui/textarea";

// export default function EditCollectionDialog({
//   formClassName,
//   buttonClassName,
//   id,
// }: {
//   formClassName?: string;
//   buttonClassName?: string;
//   id: string;
// }) {
//   const [completion, setCompletion] = useState<number[]>([0]);
//   const [score, setScore] = useState<number>(0);

//   return (
//     <Dialog>
//       <form className={formClassName}>
//         <DialogTrigger asChild>
//           <Button
//             className={cn(
//               "mx-auto flex w-full flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-muted-foreground text-xs transition-all hover:bg-primary/10 hover:text-primary",
//               buttonClassName
//             )}
//             variant={"ghost"}
//           >
//             <Pencil size={12} /> Edit
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-x-1.5 text-center text-xl">
//               <Gamepad2 className="text-primary" /> Edit Game
//             </DialogTitle>
//             {/* <DialogDescription>
//               Make changes to your profile here. Click save when you&apos;re
//               done.
//             </DialogDescription> */}
//           </DialogHeader>
//           <FieldGroup>
//             <Field>
//               <Label htmlFor="game-title">Game Title *</Label>
//               <Input
//                 className="bg-secondary"
//                 defaultValue="Cyberpunk 2077"
//                 id="game-title"
//                 name="game-title"
//               />
//             </Field>
//             <Field>
//               <Label htmlFor="cover-image-URL">Cover Image URL</Label>
//               <Input
//                 className="bg-secondary"
//                 id="cover-image-URL"
//                 name="cover-image-URL"
//               />
//             </Field>
//             <Field>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex flex-col gap-y-2">
//                   <Label>Platform *</Label>
//                   <Select defaultValue="pc">
//                     <SelectTrigger className="w-full bg-secondary">
//                       <SelectValue placeholder="Select a platform" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectItem value="pc">PC</SelectItem>
//                         <SelectItem value="playstation">PlayStation</SelectItem>
//                         <SelectItem value="xbox">Xbox</SelectItem>
//                         <SelectItem value="nintendo-switch">
//                           Nintendo Switch
//                         </SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="flex flex-col gap-y-2">
//                   <Label>Status *</Label>
//                   <Select defaultValue="playing">
//                     <SelectTrigger className="w-full bg-secondary">
//                       <SelectValue placeholder="Select a status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectItem value="playing">Playing</SelectItem>
//                         <SelectItem value="completed">Completed</SelectItem>
//                         <SelectItem value="backlog">Backlog</SelectItem>
//                         <SelectItem value="wishlist">Wishlist</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             </Field>

//             <Field>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex flex-col gap-y-2">
//                   <Label>Hours Played</Label>
//                   <Input
//                     className="bg-secondary"
//                     defaultValue={"85"}
//                     type="number"
//                   />
//                 </div>

//                 <div className="flex flex-col gap-y-2">
//                   <Label>Completion %</Label>
//                   <div className="flex gap-x-2">
//                     <Slider
//                       className="flex-1"
//                       max={100}
//                       onValueChange={setCompletion}
//                       step={1}
//                       value={completion}
//                     />
//                     <span className="w-10 text-right text-muted-foreground text-sm">
//                       {completion}%
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Field>

//             <div className="flex flex-col gap-y-2">
//               <Label>Personal Rating</Label>
//               <div className="flex">
//                 {Array.from({ length: 5 }, (_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setScore(index + 1)}
//                     type="button"
//                   >
//                     <Star
//                       className={
//                         index < score
//                           ? "fill-yellow-400 text-yellow-400"
//                           : "fill-transparent text-muted-foreground/30"
//                       }
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <Field>
//               <Label>Notes</Label>
//               <Textarea
//                 className="min-h-15 bg-secondary"
//                 placeholder="Favorite moments, things to remember..."
//                 rows={3}
//               />
//             </Field>
//           </FieldGroup>
//           <DialogFooter className="bg-transparent">
//             <DialogClose asChild>
//               <Button
//                 className="flex-1 border-border bg-transparent"
//                 variant="outline"
//               >
//                 Cancel
//               </Button>
//             </DialogClose>
//             <Button
//               className="flex-1"
//               onClick={() => console.log(id)}
//               type="submit"
//             >
//               Update Game
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </form>
//     </Dialog>
//   );
// }

import { Gamepad2, Loader, Pencil, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { editCollectionById } from "@/actions/collection";
import type { Collection } from "@/app/generated/prisma/client";
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

export default function EditCollectionDialog({
  formClassName,
  buttonClassName,
  id,
  collection,
}: {
  formClassName?: string;
  buttonClassName?: string;
  id: string;
  collection: Collection;
}) {
  const [openState, setOpenState] = useState(false);

  const [completion, setCompletion] = useState<number[]>([0]);
  const [score, setScore] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [platform, setPlatform] = useState<Platform>("PC");
  const [status, setStatus] = useState<Status>("PLAYING");
  const [playtime, setPlaytime] = useState(0);
  const [note, setNote] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    if (!collection) {
      return;
    }

    setTitle(collection.title);
    setImageURL(collection.imageURL);
    setPlatform(collection.platform);
    setStatus(collection.status);
    setPlaytime(collection.playtime);
    setCompletion([collection.completion]);
    setScore(collection.score);
    setNote(collection.note ?? "");
  }, [collection]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBtnLoading(true);
    await editCollectionById({
      id,
      title,
      completion: Number(completion),
      imageURL,
      platform,
      playtime,
      score,
      status,
      note,
    });

    setBtnLoading(false);
    setOpenState(false);
  };

  return (
    <Dialog onOpenChange={setOpenState} open={openState}>
      <form
        className={formClassName}
        id="edit-collection-form"
        onSubmit={handleSubmit}
      >
        <DialogTrigger asChild>
          <Button
            className={cn(
              "mx-auto flex w-full flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-muted-foreground text-xs transition-all hover:bg-primary/10 hover:text-primary",
              buttonClassName
            )}
            variant="ghost"
          >
            <Pencil size={12} /> Edit
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-x-1.5 text-center text-xl">
              <Gamepad2 className="text-primary" /> Edit Game
            </DialogTitle>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="game-title">Game Title *</Label>
              <Input
                className="bg-secondary"
                form="edit-collection-form"
                id="game-title"
                onChange={(e) => setTitle(e.target.value)}
                required
                value={title}
              />
            </Field>

            <Field>
              <Label htmlFor="cover-image-URL">Cover Image URL</Label>
              <Input
                className="bg-secondary"
                form="edit-collection-form"
                id="cover-image-URL"
                onChange={(e) => setImageURL(e.target.value)}
                value={imageURL}
              />
            </Field>

            <Field>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label>Platform *</Label>

                  <Select
                    form="edit-collection-form"
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
                    form="edit-collection-form"
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
                    form="edit-collection-form"
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
                      form="edit-collection-form"
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
                    form="edit-collection-form"
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
                form="edit-collection-form"
                onChange={(e) => setNote(e.target.value)}
                placeholder="Favorite moments, things to remember..."
                rows={3}
                value={note}
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

            <Button
              className="flex-1"
              disabled={btnLoading}
              form="edit-collection-form"
              type="submit"
            >
              {btnLoading ? <Loader className="animate-spin" /> : "Update Game"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
