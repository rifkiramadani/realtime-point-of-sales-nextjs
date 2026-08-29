"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import DataTable from "@/components/common/data-table";
import { useCallback, useMemo, useState } from "react";
import DropdownAction from "@/components/common/dropdown-action";
import { Pencil, Trash2 } from "lucide-react";
import useDataTable from "@/hooks/use-data-table";
import { cn } from "@/lib/utils";
import { Table } from "@/validations/table-validation";
import { HEADER_TABLE_ORDER } from "@/constants/order-constant";
import DialogCreateOrder from "./dialog-create-order";
import { Order } from "@/validations/order-validation";

const OrderManagement = () => {
  const supabase = createClient();
  const {
    currentPage,
    currentLimit,
    currentSearch,
    handleChangeLimit,
    handleChangePage,
    handleChangeSearch,
  } = useDataTable();
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", currentPage, currentLimit, currentSearch],
    queryFn: async () => {
      const query = supabase
        .from("orders")
        .select(
          `
            id, order_id, customer_name, status, payment_url, tables (name, id)
            `,
          { count: "exact" },
        )
        .range((currentPage - 1) * currentLimit, currentPage * currentLimit - 1)
        .order("created_at");

      if (currentSearch) {
        query.or(
          `order_id.ilike.%${currentSearch}%,customer_name.ilike.%${currentSearch}%`,
        );
      }

      const result = await query;

      if (result.error) {
        toast.error("Get Order data failed", {
          description: result.error.message,
        });
        throw new Error(result.error.message);
      }
      return result ?? [];
    },
  });

  const [open, setOpen] = useState(false);

  const { data: tables, refetch: refetchTables } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const result = await supabase
        .from("tables")
        .select("*")
        .order("created_at")
        .order("status");

      return result.data;
    },
  });

  const [selectedAction, setSelectedAction] = useState<{
    data: Order;
    type: "update" | "delete";
  } | null>();

  const handleCreateSuccess = useCallback(() => {
    setOpen(false);
  }, []);

  const handleChangeAction = useCallback((open: boolean) => {
    if (!open) {
      setSelectedAction(null);
    }
  }, []);

  const filteredData = useMemo(() => {
    return (orders?.data || []).map((order, index) => {
      return [
        currentLimit * (currentPage - 1) + index + 1,
        order.order_id,
        order.customer_name,
        (order.tables as unknown as { name: string }).name,
        <div
          className={cn("px-2 py-1 rounded-full text-white w-fit capitalize", {
            "bg-lime-600": order.status === "settled",
            "bg-sky-600": order.status === "process",
            "bg-amber-600": order.status === "reserved",
            "bg-red-600": order.status === "canceled",
          })}
        >
          {order.status}
        </div>,
        <DropdownAction
          menu={[]}
          //   menu={[
          //     {
          //       label: (
          //         <span className="flex items-center gap-2">
          //           <Pencil />
          //           Edit
          //         </span>
          //       ),
          //       action: () => {
          //         setSelectedAction({
          //           data: table,
          //           type: "update",
          //         });
          //       },
          //     },
          //     {
          //       label: (
          //         <span className="flex items-center gap-2">
          //           <Trash2 className="text-red-400" />
          //           Delete
          //         </span>
          //       ),
          //       variant: "destructive",
          //       action: () => {
          //         setSelectedAction({
          //           data: table,
          //           type: "delete",
          //         });
          //       },
          //     },
          //   ]}
        />,
      ];
    });
  }, [orders, currentLimit, currentPage]);

  const totalPages = useMemo(() => {
    return orders && orders.count != null
      ? Math.ceil(orders.count / currentLimit)
      : 0;
  }, [orders, currentLimit]);

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search..."
            onChange={(event) => handleChangeSearch(event.target.value)}
          />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={<Button variant={"outline"}>Create</Button>}
            />
            <DialogCreateOrder
              refetch={refetch}
              onSuccess={handleCreateSuccess}
              tables={tables}
            />
          </Dialog>
        </div>
      </div>
      <DataTable
        header={HEADER_TABLE_ORDER}
        data={filteredData}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onChangePage={handleChangePage}
        onChangeLimit={handleChangeLimit}
      />
      {/* <DialogUpdateTable
        open={selectedAction !== null && selectedAction?.type === "update"}
        refetch={refetch}
        currentData={selectedAction?.data}
        handleChangeAction={handleChangeAction}
      />
      <DialogDeleteTable
        open={selectedAction !== null && selectedAction?.type === "delete"}
        refetch={refetch}
        currentData={selectedAction?.data}
        handleChangeAction={handleChangeAction}
      /> */}
    </div>
  );
};

export default OrderManagement;
