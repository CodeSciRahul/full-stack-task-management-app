import { useAppSelecter } from "@/Redux/Hooks/store";
import { Button } from "./ui/button";

interface cartProps {
  isloading: boolean;
  placeOrder: () => void;
}

export const Cart: React.FC<cartProps> = ({ isloading, placeOrder }) => {
  const cart = useAppSelecter((state) => state.cart);

  const totalCartPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.items.length > 0 ? (
          <>
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border p-4 rounded"
                >
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p>Total: ${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <p className="text-lg font-bold mt-4">
              Total Price: ${totalCartPrice.toFixed(2)}
            </p>
            <Button
              className="mt-4"
              onClick={placeOrder}
              disabled={isloading || cart.items.length === 0}
            >
              {isloading ? "Placing Order..." : "Place Order"}
            </Button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </>
  );
};
