import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Delete } from "lucide-react";
import { deleteMenu } from "@/service/apiService";
import { AxiosError } from "axios";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";

  interface DeleteMenuProps {
    id: string
  }

const DeleteMenuCard: React.FC<DeleteMenuProps> = ({id}) => {
    const [isDialogOpen, setisDialogOpen] = useState<boolean>(false)

    const handleDelete = async() => {
        try {
            setisDialogOpen(false);
            await deleteMenu(id);
            window.location.reload();
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
              toast.error(`${error.response?.data?.message}`);
            } else {
              toast.error("An unexpected error occurred");
            }
          }
    }
  return (
    <div>
      <Button
      variant="ghost"
      className="w-12"
      onClick={() => setisDialogOpen(true)}
      >
        <Delete />
      </Button>

      <AlertDialog open={isDialogOpen} onOpenChange={setisDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
          <AlertDialogDescription>
          Are you sure you want to delete this menu item? This action cannot be undone and will permanently remove the item from your menu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setisDialogOpen(false)}>
            Cancel
          </AlertDialogCancel>

          {/* Close both AlertDialog and InviteMember Dialog on Continue */}
          <AlertDialogAction
          className="bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  );
};

export default DeleteMenuCard;
