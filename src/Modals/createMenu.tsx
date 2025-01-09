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
  import { createMenu } from "@/service/apiService"; 
  import toast from "react-hot-toast"; 
  import { AxiosError } from "axios";

  interface CreateMenuDialogProps {
    isOpen: boolean;
    setisOpen: (arg: boolean) => void;
  }
  
  interface MenuFormInputs {
    name: string;
    category: string;
    price: number;
    availability: boolean;
  }
  interface MenuRes{
    message: string
  }
  
  export const CreateMenu: React.FC<CreateMenuDialogProps> = ({
    isOpen,
    setisOpen,
  }) => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<MenuFormInputs>();
  
    const onSubmit = async (data: MenuFormInputs) => {
      try {
       const response = await createMenu(data) as {data: MenuRes};
       if(response?.data){
        toast.success(`Menu created`)
       }
        setisOpen(false);
        reset();
      }catch (error: unknown) {
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
              Create Menu
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new menu item.
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
                {isSubmitting ? "Creating..." : "Create Menu"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  