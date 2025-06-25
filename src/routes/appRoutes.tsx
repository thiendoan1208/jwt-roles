import SignIn from "@/reactComponents/author/SignIn";
import SignUp from "@/reactComponents/author/SignUp";
import GroupRoles from "@/reactComponents/group-role/GroupRole";
import HomePage from "@/reactComponents/Home";
import Roles from "@/reactComponents/roles/Roles";
import Users from "@/reactComponents/user-manage/Users";

const publicRoute = [
  { path: "/", component: <HomePage /> },
  { path: "/sign-in", component: <SignIn /> },
  { path: "/sign-up", component: <SignUp /> },
  { path: "/users", component: <Users />, private: true },
  { path: "/roles", component: <Roles />, private: true },
  { path: "/group-roles", component: <GroupRoles />, private: true },
];

export { publicRoute };
