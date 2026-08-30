import DetailOrder from "./_components/detail-order";

export const metadata = {
  title: "Ignaciasz Caffe | Detail Order",
};

const OrderManagementPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <DetailOrder id={id} />;
};

export default OrderManagementPage;
