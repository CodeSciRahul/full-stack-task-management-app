import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "@/Redux/Hooks/store";
import { Button } from "@/components/ui/button";
import { menu } from "@/service/apiService";
import { CreateMenu } from "@/Modals/createMenu";
import { addToCart, removeFromCart } from "@/Redux/feature/cartSlice";
import { MenuCard } from "@/components/menuCard";

interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  availability: boolean;
}

export const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isOpen, setisOpen] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const isFetching = useRef(false);

  const dispatch = useAppDispatch();

  const fetchMenuItems = async (page: number) => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      setLoading(true);

      // Fetch data from the API
      const response = await menu(page, 10);

      // Extract menu items and metadata from the response
      const { data: items, meta } = (
        response as {
          data: { data: MenuItem[]; meta: { nextPage: number | null } };
        }
      ).data;

      setMenuItems((prev) => [...prev, ...items]);
      setHasMore(meta.nextPage !== null); // Check if there are more pages available
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  const lastItemRef = (node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    fetchMenuItems(page);
  }, [page]);

  const handleAddToCart = (item: MenuItem) => {
    dispatch(addToCart({ id: item._id, name: item.name, price: item.price }));
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Menu Items</h1>
          <Button variant="outline" onClick={() => setisOpen(!isOpen)}>
            Create Menu
          </Button>
        </div>

        {/* Responsive Grid Layout */}
        <MenuCard
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          hasMore
          lastItemRef={lastItemRef}
          menuItems={menuItems}
        />

        {loading && <p className="text-center mt-4">Loading...</p>}
        {!hasMore && !loading && (
          <p className="text-center mt-4">No more items</p>
        )}
      </div>

      {/* Create Menu Modal */}
      {isOpen && <CreateMenu isOpen setisOpen={setisOpen} />}
    </>
  );
};
