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
import { createNewUser } from "@/services/user";
import type { SignUpForm } from "@/types/form";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function SignUp() {
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem("user");
    if (data) {
      const parseData = JSON.parse(data);
      if (parseData && parseData.isAuthenticate) {
        navigate("/users");
      }
    }
  }, [navigate]);

  const [signUpForm, setSignupForm] = useState<SignUpForm>({
    email: "",
    username: "",
    sex: "",
    address: "",
    phone: "",
    password: "",
    "re-password": "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  const isValidateForm = () => {
    for (const [key, value] of Object.entries(signUpForm)) {
      if (key && !value) {
        toast.error(`No ${key} is provided`);
        return false;
      }
    }

    const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!regexEmail.test(signUpForm.email)) {
      toast.error("Invalid email");
      return false;
    }

    if (signUpForm.username.length > 16) {
      toast.error("Username has to be less than 16 letter");
      return false;
    }

    if (signUpForm.sex !== "Male" && signUpForm.sex !== "Female") {
      toast.error("Please provide a correct Gender");
      return false;
    }

    if (signUpForm.password.length > 16) {
      toast.error("Password has to be less than 16 letter");
      return false;
    }

    if (signUpForm.password !== signUpForm["re-password"]) {
      toast.error("Password is not match");
      return false;
    }

    return true;
  };

  const handleSubmitSignUpForm = async () => {
    try {
      const check = isValidateForm();
      if (check) {
        const data = await createNewUser(signUpForm);
        if (data.data.EC == 1 || data.data.EC == -1) {
          toast.error(data.data.EM);
        } else {
          toast.success("Creating your account successfully. Redirecting...");
          navigate("/sign-in");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong, please try again later");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen -mt-[70px]">
      <div className="md:col-span-1 flex  items-center justify-end md:justify-center flex-col mt-12 md:mt-0">
        <div className=" text-center md:text-start">
          <h1 className="text-4xl text-blue-500 font-bold">JWT Roles</h1>
          <h3 className="mt-1 text-lg">The fastest way to delegate users</h3>
        </div>
      </div>
      <div className="md:col-span-1 flex items-center justify-center ">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Let create your account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6 max-h-80 overflow-auto">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    autoComplete="true"
                    value={signUpForm.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="ex: megumi1208"
                    required
                    autoComplete="true"
                    value={signUpForm.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                    id="gender"
                    type="text"
                    name="sex"
                    placeholder="Male/Female"
                    required
                    autoComplete="true"
                    value={signUpForm.sex}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Your address"
                    required
                    autoComplete="true"
                    value={signUpForm.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="number"
                    type="text"
                    name="phone"
                    placeholder="Your phone number"
                    required
                    autoComplete="true"
                    value={signUpForm.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    autoComplete="true"
                    value={signUpForm.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="re-password">Re-enter password</Label>
                  </div>
                  <Input
                    id="re-password"
                    type="password"
                    placeholder="Re-enter password"
                    name="re-password"
                    required
                    autoComplete="true"
                    value={signUpForm["re-password"]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              onClick={() => {
                handleSubmitSignUpForm();
              }}
              type="submit"
              className="w-full bg-blue-700"
            >
              Sign up
            </Button>
            <Button variant="outline" className="w-full">
              <Link to="/sign-in">Sign in</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
