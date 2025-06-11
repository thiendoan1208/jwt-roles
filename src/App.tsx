import { Navbar } from "@/reactComponents/navigation/Navigation";
import { Routes, Route } from "react-router";
import { publicRoute } from "@/routes/routes";

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="container">
          <Routes>
            {publicRoute.map((route) => (
              <Route path={route.path} element={route.component} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
