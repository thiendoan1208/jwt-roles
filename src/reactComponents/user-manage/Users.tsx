import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/services/user";
import type { User } from "@/types/user-list";
import { useEffect, useState } from "react";

function Users() {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getUserList = async () => {
      try {
        const data = await getAllUsers(signal);
        if (data && data.data.EC === 0) {
          setUserList(data.data.DT);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserList();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="mx-5">
      <div>
        <h1 className="font-semibold text-2xl my-2 text-red-400">
          Here is a list of your users
        </h1>
      </div>
      <Table>
        <TableCaption>A list of your Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead className="w-[100px]">UserID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead className="">Group</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList &&
            userList.length > 0 &&
            userList.map((user, index) => (
              <TableRow key={`user-${index}`}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell className="">{user.Group.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </div>
  );
}

export default Users;
