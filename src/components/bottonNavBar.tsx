import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const BottomNavbar = ({ className }: { className: string }) => {
  const [activeState, setActiveState] = useState<string>("");
  const navigate = useNavigate();

  // Array of menu options
  const menuOptions = [
    { id: "", label: "Menu"},
    { id: "order", label: "Order"},
  ];

  return (
    <>
      <div className={cn("", className)}>
        <div className="space-x-4 px-4 fixed bottom-0 w-full border-t bg-white">
          <div className="py-3">
            <div className="flex space-y-1">
              {menuOptions.map((item) => (
                <div key={item.id} className="relative w-full" onClick={() =>navigate(`/${item?.id}`)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start flex gap-2"
                    onClick={() =>
                      setActiveState(item.id)
                    }
                  >
                    <span
                      className={` ${
                        activeState === item.id ? "text-[#001F3F]" : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Button>
                  {/* Bottom bar when active */}
                  {activeState === item.id && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#001F3F] rounded-t-md"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
