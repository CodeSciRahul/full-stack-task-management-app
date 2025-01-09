import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/sidebar";
import { BottomNavbar } from "@/components/bottonNavBar";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import FallbackUI from "@/components/fallbackUI";

export default function Dashboard() {

  return (
    <>
    <ErrorBoundary FallbackComponent={FallbackUI}>
     <div className="flex flex-col">

        <Separator orientation="horizontal" className="w-full" />

        <div className="flex flex-1 bg-background mb-12">
          <Sidebar className="hidden lg:block h-full w-96" />
          <Separator orientation="vertical" className="hidden lg:block h-[100vh]" />
          <div className="flex-grow p-4 w-full">
            <Outlet />
          </div>
        </div>

        <BottomNavbar className="block lg:hidden" />
      </div>
    </ErrorBoundary>
    </>
  );
}
