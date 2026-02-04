
"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export type AuthState = {
  message?: string;
  error?: string;
  success?: boolean;
};

export async function signupAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const client = await pool.connect();
    try {
      // Check if user exists
      const existingUser = await client.query("SELECT * FROM users WHERE email = $1", [email]);
      if (existingUser.rows.length > 0) {
        return { error: "User already exists with this email" };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      await client.query(
        "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, email, hashedPassword]
      );

      return { success: true, message: "Account created successfully" };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "Something went wrong during signup" };
  }
}

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const client = await pool.connect();
    try {
      const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
      
      if (result.rows.length === 0) {
        return { error: "Invalid credentials" };
      }

      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return { error: "Invalid credentials" };
      }

      // In a real app, you would set a session cookie here.
      // For this example, we'll return success and let the client redirect.
      // Or we can use a cookie library like 'nookies' or Next.js 'cookies' API to set a session.
      
      // Simulating session set for now (since we don't have a full auth framework like NextAuth)
      return { success: true };
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Something went wrong during login" };
  }
}
