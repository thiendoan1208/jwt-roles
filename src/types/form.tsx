type SignUpForm = {
  email: string;
  username: string;
  sex: string;
  address: string;
  phone: string;
  password: string;
  "re-password": string;
};

type SignInForm = {
  email: string;
  password: string;
};

type CreateUserForm = {
  email: string;
  username: string;
  sex: string;
  address: string;
  phone: string;
  password: string;
  groupID: number;
};

type UpdateUserForm = {
  id: number;
  email: string;
  username: string;
  sex: string;
  address: string;
  phone: string;
  groupID: number;
};

export type { SignUpForm, SignInForm, CreateUserForm, UpdateUserForm };
