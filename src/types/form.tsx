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

export type { SignUpForm, SignInForm };
