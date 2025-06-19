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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { getAllGroup } from "@/services/group";
import type { Group } from "@/types/group";
import type { UpdateUserForm } from "@/types/form";
import { updateUser } from "@/services/user";

import { toast } from "sonner";
import type { UpdateUserType } from "@/types/user-list";

function UpdateUser({
  user,
  userListFunc,
}: {
  user: UpdateUserType;
  userListFunc: (signal: AbortSignal) => Promise<void>;
}) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [createUserForm, setCreateUserForm] = useState<UpdateUserForm>(user);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await getAllGroup();
        if (data && data.data.EC === "0") {
          setGroups(data.data.DT);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getGroups();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateUserForm({
      ...createUserForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (value: string) => {
    setCreateUserForm({
      ...createUserForm,
      sex: value,
    });
  };

  const handleGroupChange = (value: string) => {
    setCreateUserForm({
      ...createUserForm,
      groupID: Number(value),
    });
  };

  const submitForm = async () => {
    try {
      const controller = new AbortController();
      const data = await updateUser(createUserForm);

      if (data.data.EC === 0) {
        toast.success("Update user success");
        userListFunc(controller.signal);
      }
    } catch (error) {
      toast.error("Cannot create user");
      console.log(error);
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-yellow-400">
            Update
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[512px] z-[500]">
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
            <DialogDescription>Update your user here</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2">
            <div className="flex space-x-2 justify-around col-span-2">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder={user.email}
                  value={createUserForm.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  placeholder=""
                  value={createUserForm.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex mt-2 space-x-2 justify-around col-span-2">
              <div className="grid gap-3">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder=""
                  value={createUserForm.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-3 cursor-not-allowed">
                <Label htmlFor="password">Password</Label>
                <Input
                  disabled
                  id="password"
                  name="password"
                  placeholder=""
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid mt-2 gap-3 col-span-2 mx-[12px]">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder=""
                value={createUserForm.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex mt-3 space-x-2 mx-3 justify-between col-span-2">
              <div className="grid gap-3">
                <Select
                  value={createUserForm.sex}
                  onValueChange={handleGenderChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent className="z-[501]">
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Select
                  value={String(createUserForm.groupID)}
                  onValueChange={handleGroupChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Group" />
                  </SelectTrigger>
                  <SelectContent className="z-[501]">
                    <SelectGroup>
                      <SelectLabel>Group</SelectLabel>
                      {groups &&
                        groups.map((group) => (
                          <SelectItem
                            key={`group-${group.id}`}
                            value={String(group.id)}
                          >
                            {group.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => {
                submitForm();
              }}
              type="submit"
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default UpdateUser;
