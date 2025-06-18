type User = {
  id: number;
  username: string;
  email: string;
  phone: string;
  sex: string;
  Group: {
    name: string;
    description: string;
  };
};

type UpdateUserType = {
  id: number;
  username: string;
  email: string;
  phone: string;
  sex: string;
  address: string;
  password: string;
  groupID: number;
  Group: {
    name: string;
    description: string;
  };
};

export type { User, UpdateUserType };
