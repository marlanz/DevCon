"use client";

import { Input } from "@/components/ui/input";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

interface Props {
  value?: File;
  onChange: (file: File | undefined) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  const removeFile = () => {
    onChange(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const preview = value ? URL.createObjectURL(value) : null;

  return (
    <div>
      <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer overflow-hidden">
        {/* IMAGE PREVIEW */}
        {preview ? (
          <>
            <div className="relative w-full h-40 flex items-center justify-center bg-muted">
              <Image
                src={preview}
                alt="preview"
                fill
                className="object-contain p-2"
              />
            </div>

            {/* overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm">
              Change image
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Select an avatar</span>
            </p>
            <p className="text-xs text-gray-500">Click to upload (max 2MB)</p>
          </div>
        )}

        <Input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFileChange}
          ref={inputRef}
        />
      </label>

      {/* REMOVE BUTTON */}
      {value && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={removeFile}
            className="flex items-center gap-1 text-red-500 text-sm cursor-pointer"
          >
            <X size={16} />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
