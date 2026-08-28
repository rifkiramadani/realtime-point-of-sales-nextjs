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
import { AVAILABILITY_LIST, CATEGORY_LIST } from "@/constants/menu-constants";
import { Preview } from "@/types/general";
import { Loader2 } from "lucide-react";
import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

export default function FormMenu<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  isLoading: boolean;
  type: "Create" | "Update";
  preview: Preview | undefined;
  setPreview: (preview: Preview | undefined) => void;
}) {
  return (
    <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>{type} Menu</DialogTitle>
        <DialogDescription>
          {type === "Create" ? "Add a New Menu" : "Make Changes Menu Here"}
        </DialogDescription>
      </DialogHeader>
      <form
        id="create-user-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
          <FormInput
            form={form}
            name={"name" as Path<T>}
            label="Name"
            type="text"
            placeholder="Insert Name Here"
          />
          <FormInput
            form={form}
            name={"description" as Path<T>}
            label="Description"
            type="textarea"
            placeholder="Insert Description Here"
          />
          <FormSelect
            form={form}
            name={"category" as Path<T>}
            label="Category"
            selectItem={CATEGORY_LIST}
          />
          <FormInput
            form={form}
            name={"price" as Path<T>}
            label="Price"
            type="number"
            placeholder="Insert Price Here"
          />
          <FormInput
            form={form}
            name={"discount" as Path<T>}
            label="Discount"
            type="number"
            placeholder="Insert Discount Here"
          />
          <FormImage
            form={form}
            name={"image_url" as Path<T>}
            label="Image"
            preview={preview}
            setPreview={setPreview}
          />
          <FormSelect
            form={form}
            name={"is_available" as Path<T>}
            label="Availability"
            selectItem={AVAILABILITY_LIST}
          />
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
