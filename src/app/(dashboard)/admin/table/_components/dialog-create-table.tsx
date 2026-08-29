import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createTable } from "../actions";
import { INITIAL_STATE_TABLE, INITIAL_TABLE } from "@/constants/table-constant";
import { TableForm, tableFormSchema } from "@/validations/table-validation";
import FormTable from "./form-table";

const DialogCreateTable = ({
  refetch,
  onSuccess,
}: {
  refetch: () => void;
  onSuccess?: () => void;
}) => {
  //instance form
  const form = useForm<TableForm>({
    resolver: zodResolver(tableFormSchema), //panggil type dan skema form dari auth-validation.ts
    defaultValues: INITIAL_TABLE,
  });

  const [createTableState, createTableAction, isPendingCreateTable] =
    useActionState(createTable, INITIAL_STATE_TABLE);

  //fungsi ketika tombol submit ditekan dan form berfungsi
  const onSubmit = async (data: TableForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      createTableAction(formData);
    });
  };

  useEffect(() => {
    if (createTableState?.status == "error") {
      toast.error("Create Table Failed", {
        description: createTableState.errors?._form?.[0],
      });
    }

    if (createTableState?.status === "success") {
      toast.success("Create Table Success");
      form.reset();
      onSuccess?.();
      refetch();
    }
  }, [createTableState, form, refetch, onSuccess]);

  return (
    <FormTable
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateTable}
      type="Create"
    />
  );
};

export default DialogCreateTable;
