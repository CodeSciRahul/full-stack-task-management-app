import React, { useState, useEffect, useRef, useCallback } from "react";
import { useAppDispatch } from "@/Redux/Hooks/store";
import { Button } from "@/components/ui/button";
import { menu, searchMenu } from "@/service/apiService";
import { CreateMenu } from "@/Modals/createMenu";
import { addToCart, removeFromCart } from "@/Redux/feature/cartSlice";
import { MenuCard } from "@/components/menuCard";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  availability: boolean;
}

const categorys = [
  { name: "Appetizers" },
  { name: "Main Course" },
  { name: "Desserts" },
];

export const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isOpen, setisOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>(""); // For search query
  const [category, setCategory] = useState<string>(""); // For search category
  const observer = useRef<IntersectionObserver | null>(null);
  const isFetching = useRef(false);

  const dispatch = useAppDispatch();

  // Wrap fetchMenuItems in useCallback to prevent re-creation on each render
  const fetchMenuItems = useCallback(async (page: number) => {
    if (isFetching.current) return;
    isFetching.current = true;

    try {
      setLoading(true);

      const response =
        query || category
          ? await searchMenu(page, 10, query, category)
          : await menu(page, 10);

      const { data: items, meta } = (
        response as {
          data: { data: MenuItem[]; meta: { nextPage: number | null } };
        }
      ).data;

      if (page === 1) setMenuItems(items); // Reset items for new search
      else setMenuItems((prev) => [...prev, ...items]);

      setHasMore(meta.nextPage !== null); // Check if there are more pages available
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [query, category]); // Add query and category as dependencies

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

  // Only call fetchMenuItems when page changes
  useEffect(() => {
    fetchMenuItems(page);
  }, [page, fetchMenuItems]);

  // Debounced search functionality
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1); // Reset page for a new search
      fetchMenuItems(1); // Fetch results for the first page
    }, 500); // Debounce delay

    return () => clearTimeout(delayDebounceFn);
  }, [query, category, fetchMenuItems]); // Trigger search on query or category change

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

        {/* Search Bar */}
        <div className="flex mb-4 flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by food name..."
            className="flex-1 border p-2 mr-2 rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Search by Category..." />
            </SelectTrigger>
            <SelectContent>
              {categorys?.map((category) => (
                <SelectItem key={category?.name} value={category?.name}>
                  {category?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Responsive Grid Layout */}
        <MenuCard
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          hasMore={hasMore}
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
