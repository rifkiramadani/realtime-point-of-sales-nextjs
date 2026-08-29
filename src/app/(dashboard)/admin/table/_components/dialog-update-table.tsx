import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateTable } from "../actions";
import FormTable from "./form-table";
import { Dialog } from "@/components/ui/dialog";
import { INITIAL_STATE_TABLE } from "@/constants/table-constant";
import {
  Table,
  TableForm,
  tableFormSchema,
} from "@/validations/table-validation";

const DialogUpdateTable = ({
  refetch,
  currentData,
  open,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Table;
  open?: boolean;
  handleChangeAction?: (open: boolean) => void;
}) => {
  //instance form
  const form = useForm<TableForm>({
    resolver: zodResolver(tableFormSchema), //panggil type dan skema form dari table-validation.ts
  });

  const [updateTableState, updateTableAction, isPendingUpdateTable] =
    useActionState(updateTable, INITIAL_STATE_TABLE);

  //fungsi ketika tombol submit ditekan dan form berfungsi
  const onSubmit = async (data: TableForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([Key, value]) => {
      formData.append(Key, value);
    });
    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateTableAction(formData);
    });
  };

  useEffect(() => {
    if (updateTableState?.status == "error") {
      toast.error("Update Table Failed", {
        description: updateTableState.errors?._form?.[0],
      });
    }

    if (updateTableState?.status === "success") {
      toast.success("Update Table Success");
      form.reset();
      handleChangeAction?.(false);
      refetch();
    }
  }, [updateTableState, form, refetch, handleChangeAction]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name);
      form.setValue("description", currentData.description);
      form.setValue("capacity", currentData.capacity.toString());
      form.setValue("status", currentData.status);
    }
  }, [currentData, form]);

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <FormTable
        form={form}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateTable}
        type="Update"
      />
    </Dialog>
  );
};

export default DialogUpdateTable;
