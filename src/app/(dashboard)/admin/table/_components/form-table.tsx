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
import { STATUS_TABLE_LIST } from "@/constants/table-constant";
import { Loader2 } from "lucide-react";
import {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

export default function FormTable<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
}: {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  isLoading: boolean;
  type: "Create" | "Update";
}) {
  return (
    <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>{type} Table</DialogTitle>
        <DialogDescription>
          {type === "Create" ? "Add a New Table" : "Make Changes Table Here"}
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
          <FormInput
            form={form}
            name={"capacity" as Path<T>}
            label="Capacity"
            type="number"
            placeholder="Insert Capacity Here"
          />
          <FormSelect
            form={form}
            name={"status" as Path<T>}
            label="Status"
            selectItem={STATUS_TABLE_LIST}
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
