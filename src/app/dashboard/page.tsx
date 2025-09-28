"use client";
import { useUser } from "@clerk/nextjs";

export default function DashboardClient() {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) return <div>Please log in</div>;
  return <div>Hello {user?.firstName}</div>;
}
