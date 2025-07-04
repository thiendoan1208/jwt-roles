import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/Context/UserContext";
import { signInUser } from "@/services/user";
import type { SignInForm } from "@/types/form";
import type { Roles, UserLogin } from "@/types/user";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { SyncLoader } from "react-spinners";

export default function SignIn() {
  const { loginContext } = useContext(UserContext);
  const navigate = useNavigate();
  const [signInForm, setSignInForm] = useState<SignInForm>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const data = sessionStorage.getItem("user");
    if (data) {
      const parseData = JSON.parse(data);
      if (parseData && parseData.isAuthenticate) {
        navigate("/users");
      }
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInForm({
      ...signInForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSessionsStorage = (userData: {
    data: { email: string; username: string; roles: []; access_token: string };
  }) => {
    const email = userData.data.email;
    const username = userData.data.username;
    const roles: Roles[] = userData.data.roles;

    const data: UserLogin = {
      isAuthenticate: true,
      token: userData.data.access_token,
      account: { email, username, roles },
    };

    loginContext(data);
    sessionStorage.setItem("user", JSON.stringify(data));
  };

  const handleSubmitSignInForm = async () => {
    try {
      if (!signInForm.email) {
        toast.error("Please provide your email");
        return;
      }

      if (!signInForm.password) {
        toast.error("Please provide your password");
        return;
      }
      setLoading(true);
      const data = await signInUser(signInForm);

      if (data.data.EC === 1 || data.data.EC === -1) {
        toast.error(data.data.EM);
        setLoading(false);
      } else {
        toast.success(data.data.EM);
        navigate("/users");
        handleSessionsStorage(data.data);
        localStorage.setItem("token", data.data.data.access_token);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something wrong, please try again later");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen -mt-[70px]">
      {loading ? (
        <div className="flex items-center justify-center">
          <div>
            <div className="text-center">
              <SyncLoader />
            </div>
            <h4 className="mt-4">Loading user list, please wait</h4>
          </div>
        </div>
      ) : (
        <>
          <div className="md:col-span-1 flex  items-center justify-end md:justify-center flex-col -mb-10 md:mb-0">
            <div className=" text-center md:text-start">
              <h1 className="text-4xl text-blue-500 font-bold">JWT Roles</h1>
              <h3 className="mt-1 text-lg">
                The fastest way to delegate users
              </h3>
            </div>
          </div>
          <div className="md:col-span-1 flex items-center justify-center mb-10">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        autoComplete="true"
                        name="email"
                        value={signInForm.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        required
                        autoComplete="true"
                        name="password"
                        value={signInForm.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  onClick={() => {
                    handleSubmitSignInForm();
                  }}
                  type="submit"
                  className="w-full bg-blue-700"
                >
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  <Link to="/sign-up">Sign up</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
