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
import { Link } from "react-router";

export default function SignUp() {
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
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="re-password">Re-enter password</Label>
                  </div>
                  <Input
                    id="re-password"
                    type="password"
                    placeholder="Password"
                    name="re-password"
                    required
                    autoComplete="true"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full bg-blue-700">
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
