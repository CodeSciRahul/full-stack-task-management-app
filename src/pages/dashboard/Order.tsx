import { useEffect, useState } from "react";
import { useAppSelecter, useAppDispatch } from "@/Redux/Hooks/store";
import { clearCart } from "@/Redux/feature/cartSlice";
import { createOrder, orderHistory } from "@/service/apiService";
import { Cart } from "@/components/cart";
import { OrderHistory } from "@/components/orderHistory";
import { MyPaginationComponent } from "@/components/pagination"

interface OrderItem {
  menuItemId: {
    _id: string;
    name: string;
    category: string;
    price: number;
    availability: true;
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

interface OrderHistoryResponse {
  data: OrderData[];
  meta: {
    totalOrders: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    previousPage: number | null;
    nextPage: number | null;
  };
}

interface createOrderReq {
  items: {
    menuItemId: string;
    quantity: number;
  }[]; // Changed from tuple to array
}

export const Order = () => {
  const cart = useAppSelecter((state) => state.cart);
  const dispatch = useAppDispatch();
  const [pastOrders, setPastOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const placeOrder = async () => {
    try {
      setLoading(true);

      const orderData: createOrderReq = {
        items: cart.items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      };
      await createOrder(orderData);

      dispatch(clearCart());
      fetchOrderHistory(1);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderHistory = async (page: number) => {
    try {
      setLoading(true);

      const response = await orderHistory(page, 2);
      const { data, meta } = response.data as OrderHistoryResponse;

      setPastOrders(data);
      setTotalPages(meta.totalPages);
    } catch (error) {
      console.error("Failed to fetch order history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchOrderHistory(page);
  };

  useEffect(() => {
    fetchOrderHistory(currentPage);
  }, [currentPage]);

  return (
    <div className="p-6">
      {/* Cart Section */}
      <Cart
      isloading = {loading}
      placeOrder={placeOrder} 
      />

      {/* Order History Section */}
      <OrderHistory
      loading
      pastOrders={pastOrders} 
      />

      {/* Pagination Component */}
      <div className="mt-6">
      <MyPaginationComponent
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
      />
      </div>
    </div>
  );
};
