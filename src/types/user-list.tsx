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

export type { User };
