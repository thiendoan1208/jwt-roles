import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { deleteUser } from "@/services/user";
import { toast } from "sonner";

function DeleteUserDialog({
  id,
  email,
  username,
  userListFunc,
}: {
  id: number;
  email: string;
  username: string;
  userListFunc: (signal: AbortSignal) => Promise<void>;
}) {
  const handleDeleteUser = async (id: number) => {
    const controller = new AbortController();
    const signal = controller.signal;

    const data = await deleteUser(id);
    if (data.data.EC === 0 && data.data) {
      userListFunc(signal);
      toast.success(data.data.EM);
    } else {
      toast.error("Cannot delete user");
    }
  };

  return (
    <div>
      <Dialog>
        <div>
          <DialogTrigger asChild>
            <Button variant="outline">Delete</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] z-[500]">
            <DialogHeader>
              <DialogTitle>Are you sure to delete this user ?</DialogTitle>
              <DialogDescription>
                You cannot undo this action, please becareful
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Email</Label>
                <h4>{email}</h4>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <h4>{username}</h4>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                type="submit"
                onClick={() => {
                  handleDeleteUser(id);
                }}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default DeleteUserDialog;
