import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers } from "@/services/user";
import type { User } from "@/types/user-list";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

type selectedItem = {
  selected: number;
};

const PAGE_LIMIT = 5;

function Users() {
  const [userList, setUserList] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getUserList = async () => {
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

    getUserList();
    return () => {
      controller.abort();
    };
  }, [currentPage]);

  const handlePageClick = (event: selectedItem) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <div className="mx-5">
      <div>
        <h1 className="font-semibold text-2xl my-2 text-red-400">
          <p>Here is a list of your users </p>
          {`Page: ${currentPage}`}
        </h1>
      </div>
      <Table>
        <TableCaption></TableCaption>
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
                <TableCell className="">{user.Group?.name ?? "N/A"}</TableCell>
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
