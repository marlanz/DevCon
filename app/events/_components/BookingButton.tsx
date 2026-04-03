"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import z from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const BookingSchema = z.object({
  fullName: z.string().min(1),
  workEmail: z.email().min(1),
  jobTitle: z.string().min(1),
  companyName: z.string().min(1),
  avatar: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Image is required")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 2MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .webp .png .jpg formats is accepted",
    ),
});

type BookingForm = z.infer<typeof BookingSchema>;

export function BookingButton({
  title,
  slug,
  _id,
}: {
  title: string;
  slug: string;
  _id: string;
}) {
  const form = useForm<BookingForm>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      jobTitle: "",
      companyName: "",
      avatar: undefined,
    },
  });

  const { isSubmitting } = form.formState;
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent
          className=""
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="leading-relaxed text-[20px]">
              Your Journey to {title} Starts Here!
            </DialogTitle>
            <DialogDescription>
              Secure your developer pass at one of the biggest conference
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save change</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
