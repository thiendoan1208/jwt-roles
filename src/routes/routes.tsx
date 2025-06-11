import SignIn from "@/reactComponents/author/SignIn";
import SignUp from "@/reactComponents/author/SignUp";

const publicRoute = [
  { path: "/sign-in", component: <SignIn /> },
  { path: "/sign-up", component: <SignUp /> },
];

export { publicRoute };
