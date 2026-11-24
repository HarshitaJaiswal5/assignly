import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import PrivateLayoutClient from "@/app/(private)/privateLayoutClient";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <PrivateLayoutClient>{children}</PrivateLayoutClient>;
}