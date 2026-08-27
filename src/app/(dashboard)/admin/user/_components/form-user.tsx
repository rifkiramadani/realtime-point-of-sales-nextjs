import FormImage from "@/components/common/form-image";
import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ROLE_LIST } from "@/constants/auth-constant";
import { Preview } from "@/types/general";
import { Loader2 } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export default function FormUser<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
  preview: Preview | undefined;
  setPreview: (preview: Preview | undefined) => void;
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{type} User</DialogTitle>
        <DialogDescription>
          {type === "Create" ? "Register A New User" : "Make Changes User Here"}
        </DialogDescription>
      </DialogHeader>
      <form id="create-user-form" onSubmit={onSubmit}>
        <div className="flex flex-col gap-4">
          <FormInput
            form={form}
            name={"name" as Path<T>}
            label="Name"
            type="text"
            placeholder="Insert Your Name"
          />
          {type === "Create" && (
            <FormInput
              form={form}
              name={"email" as Path<T>}
              label="Email"
              type="email"
              placeholder="Insert Your Email"
            />
          )}
          <FormImage
            form={form}
            name={"avatar_url" as Path<T>}
            label="Avatar"
            preview={preview}
            setPreview={setPreview}
          />
          <FormSelect
            form={form}
            name={"role" as Path<T>}
            label="Role"
            selectItem={ROLE_LIST}
          />
          {type === "Create" && (
            <FormInput
              form={form}
              name={"password" as Path<T>}
              label="Password"
              type="password"
              placeholder="Insert Your Password"
            />
          )}
        </div>
      </form>
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <div className="flex flex-row gap-3">
          <Button
            type="button"
            variant={"outline"}
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="create-user-form">
            {isLoading ? <Loader2 className="animate-spin" /> : type}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
