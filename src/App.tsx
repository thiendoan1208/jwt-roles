import { Navbar } from "@/reactComponents/navigation/Navigation";
import { Routes, Route } from "react-router";
import { publicRoute } from "@/routes/appRoutes";
import { Toaster } from "sonner";
import PrivateRoutes from "@/routes/privateRoutes";


function App() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="container">
          <Routes>
            {publicRoute.map((route) => {
              if (route.private) {
                return (
                  <Route
                    path={route.path}
                    element={<PrivateRoutes element={route.component} />}
                  />
                );
              } else {
                return <Route path={route.path} element={route.component} />;
              }
            })}
          </Routes>
        </div>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
