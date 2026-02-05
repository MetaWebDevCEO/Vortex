import "@/lib/polyfill";
import { createAuthClient } from '@neondatabase/auth'; 

const authUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL;

if (!authUrl && typeof window !== "undefined") {
  console.error("NEXT_PUBLIC_NEON_AUTH_URL is not set. Authentication will fail.");
}

// This client handles authentication directly with Neon Auth service
// It manages sessions automatically (using localStorage/cookies depending on config)
export const authClient = createAuthClient( 
    authUrl || ''
);

export const API_URL = process.env.NEXT_PUBLIC_NEON_API_URL || "https://ep-steep-haze-ahv4ffuq.apirest.c-3.us-east-1.aws.neon.tech/neondb/rest/v1";

// Helper to get token if needed manually (though authClient handles it)
export function logout() {
  authClient.signOut();
  if (typeof window !== "undefined") {
     window.location.href = "/login";
  }
}
