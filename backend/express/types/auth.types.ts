export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}