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
import { useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

export default function SignIn() {
  useEffect(() => {
    const test = async () => {
      const data = await axios.get("http://localhost:8080/api/test-api");
      console.log(data);
    };
    test();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen -mt-[70px]">
      <div className="md:col-span-1 flex  items-center justify-end md:justify-center flex-col -mb-10 md:mb-0">
        <div className=" text-center md:text-start">
          <h1 className="text-4xl text-blue-500 font-bold">JWT Roles</h1>
          <h3 className="mt-1 text-lg">The fastest way to delegate users</h3>
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
                    autoComplete=""
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full bg-blue-700">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
