"use client";

import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FileImage } from "lucide-react";
import { getImageData } from "@/lib/utils";
import { Preview } from "@/types/general";

export default function FormImage<T extends FieldValues>({
  form,
  name,
  label,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  preview?: Preview;
  setPreview?: (preview: Preview) => void;
}) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, ...rest }, fieldState }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={label}>{label}</FieldLabel>
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 rounded-lg shrink-0">
                <AvatarImage
                  src={preview?.displayUrl}
                  alt="preview"
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg">
                  <FileImage className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <Input
                type="file"
                name={rest.name}
                ref={rest.ref}
                onBlur={rest.onBlur}
                disabled={rest.disabled}
                onChange={async (event) => {
                  const { file, displayUrl } = getImageData(event);
                  onChange(file); // kirim File object-nya langsung
                  if (file) {
                    setPreview?.({
                      file,
                      displayUrl,
                    });
                  }
                }}
              />
            </div>
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </Field>
        );
      }}
    />
  );
}
