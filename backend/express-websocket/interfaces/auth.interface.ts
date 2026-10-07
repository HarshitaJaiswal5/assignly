export interface GoogleUser {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthUser extends GoogleUser {
  id: string;
}