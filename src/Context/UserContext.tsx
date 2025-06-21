import type { UserLogin } from "@/types/user";
import { createContext, useState, type ReactElement } from "react";

const UserContext = createContext({
  user: {
    isAuthenticate: false,
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginContext: (userData: UserLogin) => {},
});

function UserProvider({ children }: { children: ReactElement }) {
  const [user, setUser] = useState({ isAuthenticate: false });

  const loginContext = (userData: UserLogin) => {
    setUser(userData);
  };
  return (
    <UserContext.Provider value={{ user, loginContext }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
