import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/Redux/Hooks/store";
import { removeUserInfo } from "@/Redux/feature/authSlice";

export function Sidebar({ className }: { className?: string }) {
  const [activeState, setActiveState] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sidebarOptions = [
    { id: "", label: "Menu" },
    { id: "order", label: "Order" },
  ];

  return (
    <div className={cn("pb-12 min-h-full", className)}>
      <div className="space-y-4 py-4 h-full">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarOptions.map((item) => (
              <div
                key={item.id}
                className="relative w-full"
                onClick={() => navigate(`/${item?.id}`)}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start flex gap-2 ${
                    activeState === item.id
                      ? "text-[#001F3F] font-semibold border-2 border-solid"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveState(item.id)}
                >
                  <span>{item.label}</span>
                </Button>
              </div>
            ))}

            <div
              className="relative w-full text-gray-600"
              onClick={() => {
                dispatch(removeUserInfo())
                window.location.href = "/login";
              }
                
              }
            >
              <Button
                variant="ghost"
                className={`w-full justify-start flex gap-2`}
              >
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
