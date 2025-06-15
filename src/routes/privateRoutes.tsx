import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import { Link } from "react-router";

function PrivateRoutes({ element }: { element: ReactElement }) {
  const [user, setUser] = useState({
    isAuthenticate: false,
    token: "",
  });

  useEffect(() => {
    const data = sessionStorage.getItem("user");
    if (data) {
      const parseData = JSON.parse(data);
      if (parseData && parseData.isAuthenticate) {
        setUser(parseData);
      }
    }
  }, []);

  return (
    <div>
      {user && user.isAuthenticate === true ? (
        <div>{element}</div>
      ) : (
        <div className="flex  justify-center">
          <Alert variant="destructive" className="mx-20 lg:w-1/2 mt-10">
            <AlertCircleIcon />
            <AlertTitle>Unable to access this page.</AlertTitle>
            <AlertDescription>
              <p>Please Login/Sign up first and try again.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Check your personal detail</li>
                <li>Verifying information</li>
                <div className="block sm:flex gap-1.5 mt-2">
                  <Button className="w-full my-2 bg-black">
                    <Link to="/sign-in">Sign in</Link>
                  </Button>

                  <Button variant="outline" className="w-full my-2">
                    <Link to="/sign-up" className="text-black">
                      Sign up
                    </Link>
                  </Button>
                </div>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default PrivateRoutes;
