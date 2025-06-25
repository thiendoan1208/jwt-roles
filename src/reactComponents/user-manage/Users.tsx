import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteUserDialog from "@/reactComponents/Dialog/DeleteUser";
import CreateUser from "@/reactComponents/Dialog/CreateUser";
import { getAllUsers } from "@/services/user";
import type { UpdateUserType } from "@/types/user-list";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import UpdateUser from "@/reactComponents/Dialog/UpdateUser";

type selectedItem = {
  selected: number;
};

const PAGE_LIMIT = 5;

function Users() {
  const [userList, setUserList] = useState<UpdateUserType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getUserList(signal);
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const getUserList = async (signal: AbortSignal) => {
    try {
      const data = await getAllUsers(currentPage, PAGE_LIMIT, signal);

      if (data && data.data.EC === 0) {
        setUserList(data.data.DT.rows);
        setTotalPage(Math.ceil(data.data.DT.totalPages));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageClick = (event: selectedItem) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="mx-5">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl my-2 text-red-400">
          <div className="">
            <p>Here is a list of your users </p>
            <p>{`Page: ${currentPage}`}</p>
          </div>
        </h1>
        <div>
          <CreateUser userListFunc={getUserList} />
        </div>
      </div>
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead className="w-[100px]">UserID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList &&
            userList.length > 0 &&
            userList.map((user, index) => (
              <TableRow key={`user-${index}`}>
                <TableCell className="font-medium">
                  {Math.floor(index + 1 + PAGE_LIMIT * (currentPage - 1))}
                </TableCell>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell className="">{user.Group?.name ?? "N/A"}</TableCell>
                <TableCell className="">
                  <div className="flex space-x-1">
                    <div>
                      <UpdateUser user={user} userListFunc={getUserList} />
                    </div>
                    <div>
                      <DeleteUserDialog
                        id={user.id}
                        email={user.email}
                        username={user.username}
                        userListFunc={getUserList}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-center">
        <ReactPaginate
          className="flex gap-5 *:cursor-pointer"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPage}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default Users;
