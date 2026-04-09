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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import z from "zod";
import ImageUpload from "./image-upload";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const BookingSchema = z.object({
  fullName: z.string().min(1),
  workEmail: z.email().min(1),
  jobTitle: z.string().min(1, "Please fill in all fields"),
  companyName: z.string().min(1, "Please fill in all fields"),
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
  email?: string;
}) {
  const { data: session } = authClient.useSession();
  const form = useForm<BookingForm>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      fullName: "",
      workEmail: session ? session.user.email : "",
      jobTitle: "",
      companyName: "",
      avatar: undefined,
    },
  });

  const [open, setOpen] = useState(false);
  const { isSubmitting, errors } = form.formState;

  useEffect(() => {
    if (session?.user) {
      form.reset({
        fullName: "",
        workEmail: session ? session.user.email : "",
        jobTitle: "",
        companyName: "",
        avatar: undefined,
      });
    } else {
      form.reset({
        fullName: "",
        workEmail: "",
        jobTitle: "",
        companyName: "",
        avatar: undefined,
      });
    }
  }, [session]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) form.reset();
      }}
    >
      <form>
        <DialogTrigger asChild className="w-full">
          <Button variant="outline">Save A Seat Now!</Button>
        </DialogTrigger>
        <DialogContent
          className="flex flex-col h-[95vh] overflow-y-auto no-scrollbar"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="mb-3">
            <DialogTitle className="leading-relaxed text-[20px]">
              Your Journey to {title} Starts Here!
            </DialogTitle>
            <DialogDescription>
              Secure your developer pass at one of the biggest conference
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-6"
            >
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workEmail"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-x-4">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* ✅ Shared error message */}
                {(errors.jobTitle || errors.companyName) && (
                  <p className="text-sm text-destructive">
                    {errors.jobTitle?.message || errors.companyName?.message}
                  </p>
                )}
              </div>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Upload your Avatar</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button
                  type="submit"
                  onClick={form.handleSubmit((data) => {
                    console.log(data);
                  })}
                >
                  Save seat
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
