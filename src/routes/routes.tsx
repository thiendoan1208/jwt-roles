import SignIn from "@/components/reactComponents/author/SignIn";
import SignUp from "@/components/reactComponents/author/SignUp";

const publicRoute = [
  { path: "/sign-in", component: <SignIn /> },
  { path: "/sign-up", component: <SignUp /> },
];

export { publicRoute };
