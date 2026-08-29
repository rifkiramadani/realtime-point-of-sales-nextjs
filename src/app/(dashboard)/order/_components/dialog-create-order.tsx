import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createOrder } from "../actions";
import { Table } from "@/validations/table-validation";
import { OrderForm, orderFormSchema } from "@/validations/order-validation";
import {
  INITIAL_ORDER,
  INITIAL_STATE_ORDER,
  STATUS_CREATE_ORDER,
} from "@/constants/order-constant";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const DialogCreateOrder = ({
  refetch,
  onSuccess,
  tables,
}: {
  refetch: () => void;
  onSuccess?: () => void;
  tables: Table[] | undefined | null;
}) => {
  //instance form
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema), //panggil type dan skema form dari auth-validation.ts
    defaultValues: INITIAL_ORDER,
  });

  const [createOrderState, createOrderAction, isPendingCreateOrder] =
    useActionState(createOrder, INITIAL_STATE_ORDER);

  //fungsi ketika tombol submit ditekan dan form berfungsi
  const onSubmit = async (data: OrderForm) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      createOrderAction(formData);
    });
  };

  useEffect(() => {
    if (createOrderState?.status == "error") {
      toast.error("Create Order Failed", {
        description: createOrderState.errors?._form?.[0],
      });
    }

    if (createOrderState?.status === "success") {
      toast.success("Create Order Success");
      form.reset();
      onSuccess?.();
      refetch();
    }
  }, [createOrderState, form, refetch, onSuccess]);

  return (
    <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
      <DialogHeader>
        <DialogTitle>Create Table</DialogTitle>
        <DialogDescription>Add A New Order From Customer</DialogDescription>
      </DialogHeader>
      <form
        id="create-user-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto">
          <FormInput
            form={form}
            name={"customer_name"}
            label="Customer Name"
            type="text"
            placeholder="Insert Customer Name Here"
          />
          <FormSelect
            form={form}
            name={"table_id"}
            label="Table"
            selectItem={(tables ?? []).map((table: Table) => ({
              value: `${table.id}`,
              label: `${table.name} - ${table.status} (${table.capacity})`,
              disabled: table.status !== "available",
            }))}
          />
          <FormSelect
            form={form}
            name={"status"}
            label="Status"
            selectItem={STATUS_CREATE_ORDER}
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
            {isPendingCreateOrder ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default DialogCreateOrder;
