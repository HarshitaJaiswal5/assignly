import { GoogleAuth, OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

import { GoogleUser, AuthUser  } from "@/interfaces/auth.interface.js"


const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export class AuthService {
  static async loginWithGoogle(
    credential: string
  ) {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email) {
      throw new Error("Invalid Google account");
    }

    const googleUser: GoogleUser = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name ?? "Campus Loop User",
      avatar: payload.picture ?? "/default-avatar.png" ,
    };

    /*
     * TODO:
     *
     * const existingUser = await User.findOne({
     *   googleId: googleUser.googleId
     * });
     *
     * if (!existingUser) {
     *   create user
     * }
     */

    // Temporary user until DB is connected
    const user: AuthUser = {
      id: googleUser.googleId,
      googleId: googleUser.googleId,
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.avatar,
    };

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    );

    return {
      user,
      token,
    };
  }
}