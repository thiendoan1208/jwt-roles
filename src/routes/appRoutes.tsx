import SignIn from "@/reactComponents/author/SignIn";
import SignUp from "@/reactComponents/author/SignUp";
import HomePage from "@/reactComponents/Home";
import Users from "@/reactComponents/user-manage/Users";

const publicRoute = [
  { path: "/", component: <HomePage /> },
  { path: "/sign-in", component: <SignIn /> },
  { path: "/sign-up", component: <SignUp /> },
  { path: "/users", component: <Users />, private: true },
];

export { publicRoute };
