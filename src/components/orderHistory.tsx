interface OrderItem {
  menuItemId: {
    _id: string | null;
    name: string | null;
    category: string | null;
    price: number | null;
    availability: true | null;
  };
  quantity: number;
  _id: string;
}

interface OrderData {
  _id: string;
  user_id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface orderHistoryProps {
  loading: boolean;
  pastOrders: OrderData[];
}
export const OrderHistory: React.FC<orderHistoryProps> = ({
  loading,
  pastOrders,
}) => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">Order History</h2>
        {loading ? (
          <p>Loading...</p>
        ) : pastOrders.length > 0 ? (
          <div className="space-y-4">
            {pastOrders?.map((order) => (
              <div
                key={order._id}
                className="border p-4 rounded shadow-md space-y-2"
              >
                <p className="font-bold">Order ID: {order?._id}</p>
                <p>Total Price: ${order?.totalAmount.toFixed(2)}</p>
                <p>
                  Status: <span className="capitalize">{order?.status}</span>
                </p>
                <p>Placed on: {new Date(order?.createdAt).toLocaleString()}</p>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item?._id}
                      className="flex justify-between border-b pb-2"
                    >
                      {item?.menuItemId ? (
                        <>
                          <p>
                            {item?.menuItemId?.name} -{" "}
                            {item?.menuItemId?.category}
                          </p>
                          <p>
                            {item?.quantity} x ${item?.menuItemId?.price}
                          </p>
                        </>
                      ) : (
                        <p className="italic text-gray-500">
                          This menu item is no longer available.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no past orders.</p>
        )}
      </div>
    </>
  );
};
