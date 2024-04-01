import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters"; // porque sino da un error
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter, // Ésto es para decirle a NextAuth que estamos usando drizzle como ORM, necesitamos instalar el paquete de auth drizzle adapter
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
