export type UserType = {
  _id: string;
  isGoogleUser: boolean;
  name: string;
  email: string;
  password: string;
  profilePhotoUrl: string;
  theme: "light" | "dark" | "violet";
  token: string | null;
  validationToken: { value: string; expiresAt: Date } | null;
};
