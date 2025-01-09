import { Button } from "./ui/button";
import { useAppSelecter } from "@/Redux/Hooks/store";
interface MenuItem {
    _id: string;
    name: string;
    category: string;
    price: number;
    availability: boolean;
  }

interface MenuItemProps {
    menuItems: MenuItem[],
    hasMore: boolean,
    lastItemRef: (node: HTMLDivElement | null) => void,
    handleAddToCart: (item: MenuItem) => void,
    handleRemoveFromCart: (id: string) => void,
}

export const MenuCard: React.FC<MenuItemProps> = ({
    menuItems,
    hasMore,
    lastItemRef,
    handleAddToCart,
    handleRemoveFromCart

}) => {
      const cart = useAppSelecter((state)=> state.cart.items)
    return (
        <>
         {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItems.map((item, index) => (
            <div
              key={item._id}
              className="p-4 border rounded shadow-md flex flex-col gap-4 w-full overflow-hidden"
              ref={index === menuItems.length - 1 && hasMore ? lastItemRef : null}
            >
              <h2 className="text-lg font-bold truncate">{item.name}</h2>
              <p>Category: {item.category}</p>
              <p>Price: ${item.price}</p>
              <p>Availability: {item.availability ? "Yes" : "No"}</p>
              
              <div className="flex flex-col gap-2">
                <p>
                  Quantity: {(cart?.find((i) => i?.id === item._id))?.quantity ?? 0}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    className="whitespace-nowrap"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                  {(cart?.find((i) => i?.id === item._id)?.quantity ?? 0) > 0 && (
                    <Button
                      className="whitespace-nowrap"
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Remove from Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
    )
}