type UserLogin = {
  isAuthenticate: boolean;
  token: string;
  account: {
    email: string;
    username: string;
    roles: Roles[];
  };
};

type Roles = {
  id: number;
  name: string;
  description: string;
  Roles: {
    id: number;
    url: string;
    description: string;
  };
};

export type { UserLogin, Roles };
