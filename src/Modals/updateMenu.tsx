//update Menu Modal
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { useForm } from "react-hook-form";
  import { updateMenu } from "@/service/apiService";
  import toast from "react-hot-toast";
  import { AxiosError } from "axios";
  interface UpdateMenuDialogProps {
    isOpen: boolean;
    setisOpen: (arg: boolean) => void;
    menuItem: MenuItem | null; // The menu item to update
  }
  
  interface MenuItem {
    _id: string;
    name: string;
    category: string;
    price: number;
    availability: boolean;
  }
  
  export const UpdateMenu: React.FC<UpdateMenuDialogProps> = ({
    isOpen,
    setisOpen,
    menuItem,
  }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<MenuItem>({
      defaultValues: menuItem || {}, // Set initial values to the passed menuItem
    });
  
    const onSubmit = async (data: MenuItem) => {
      try {
        if (!menuItem) return;
  
        // Send the update request
       const response = await updateMenu(data, menuItem._id) as { data: { message: string } };
       if(response?.data) {
        toast.success(`${response.data.message}`|| "Menu updated");
       }
        setisOpen(false); // Close the dialog on success
        reset(); // Reset the form
        window.location.reload();
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.error(`${error.response?.data?.message}`);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={() => setisOpen(!isOpen)}>
        <DialogContent
          onInteractOutside={(event) => event.preventDefault()}
          className="w-full max-w-lg mx-auto p-4 sm:p-6 md:p-8"
        >
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl">
              Update Menu
            </DialogTitle>
            <DialogDescription>
              Modify the fields below to update the menu item.
            </DialogDescription>
          </DialogHeader>
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter menu name"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
  
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className="p-2 border rounded"
              >
                <option value="">Select Category</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Main Course">Main Course</option>
                <option value="Desserts">Desserts</option>
              </select>
              {errors.category && (
                <p className="text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>
  
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price</label>
              <Input
                id="price"
                type="number"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Price must be greater than 0" },
                })}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>
  
            <div className="flex flex-col gap-2">
              <label htmlFor="availability">Availability</label>
              <select
                id="availability"
                {...register("availability", { required: "Availability is required" })}
                className="p-2 border rounded"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
              {errors.availability && (
                <p className="text-sm text-red-600">
                  {errors.availability.message}
                </p>
              )}
            </div>
  
            <DialogFooter>
              <Button
                type="submit"
                className={`w-full md:w-auto`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Menu"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  