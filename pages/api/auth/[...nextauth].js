import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    process.env.VERCEL_ENV !== "preview" &&
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.username === "herbie" &&
          credentials.password === "herbie"
        ) {
          return {
            name: "Neuer Fisch",
            email: "test@example.com",
          };
        }

        return null;
      },
    }),

    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
