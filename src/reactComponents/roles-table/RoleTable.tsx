import { forwardRef, useImperativeHandle } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteRole, getAllRoles } from "@/services/roles";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ShareFunction = {
  fetchRoleTable: () => void;
};

const RoleTable = forwardRef<ShareFunction>((_props, ref) => {
  const [roles, setRoles] = useState<
    { id: number; url: string; description: string }[]
  >([]);

  useEffect(() => {
    handleAllRoles();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchRoleTable() {
      handleAllRoles();
    },
  }));

  const handleAllRoles = async () => {
    try {
      const data = await getAllRoles();
      setRoles(data.data.DT);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong,...");
    }
  };

  const handleDeleteRole = async (roleID: number) => {
    try {
      const data = await deleteRole(roleID);
      handleAllRoles();
      toast.success(data.data.EM);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong,...");
    }
  };

  return (
    <div>
      <div>
        <h1>Role Table</h1>
        <div className="h-[.5px] bg-gray-200"></div>
      </div>
      <Table>
        <TableCaption>A list of your recent roles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles &&
            roles.length > 0 &&
            roles.map((role, index) => (
              <TableRow key={`role-${index}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{role.url}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>
                  <div>
                    <Trash
                      onClick={() => {
                        handleDeleteRole(role.id);
                      }}
                      className="size-4 text-red-400 cursor-pointer"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
});

export default RoleTable;
