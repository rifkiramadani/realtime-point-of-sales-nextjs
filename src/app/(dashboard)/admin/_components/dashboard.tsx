"use client";

import LineCharts from "@/components/common/line-chart";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [isMounted, setIsMounted] = useState(false);

  // Pastikan komponen sudah termuat di client side untuk menghindari mismatch tanggal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const supabase = createClient();
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 6);
  lastWeek.setHours(0, 0, 0, 0);

  const {
    data: orders,
    isLoading,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["orders-per-day"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("created_at")
        .gte("created_at", lastWeek.toISOString())
        .order("created_at");

      const counts: Record<string, number> = {};

      (data ?? []).forEach((order) => {
        const date = new Date(order.created_at).toISOString().slice(0, 10);
        counts[date] = (counts[date] || 0) + 1;
      });

      return Object.entries(counts).map(([name, total]) => ({ name, total }));
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row mb-4 gap-2 justify-between w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order Create Per Week</CardTitle>
          <CardDescription>
            {/* Render tanggal hanya ketika sudah di client untuk mencegah hydration error */}
            {isMounted ? (
              <>
                Showing orders from {lastWeek.toLocaleDateString()} to{" "}
                {new Date().toLocaleDateString()}
              </>
            ) : (
              <span>Loading dates...</span>
            )}
          </CardDescription>
        </CardHeader>
        <div className="w-full h-64 p-6">
          <LineCharts data={orders} />
        </div>
      </Card>
    </div>
  );
}
