"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";

export default function SignIn() {
  const { data: session } = useSession();

  if (session) {
    console.log(session);
    return (
      <Card className="mx-auto mt-4 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <h2 className="text-lg font-bold">
              Signed in as {session.user?.email || "No email available"}
            </h2>
          </CardHeader>
          <CardContent>
            <Button onClick={() => signOut()}>Sign out</Button>
          </CardContent>
        </Card>
      </Card>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <h2 className="text-lg font-bold text-center">Not signed in</h2>
        </CardHeader>
        <CardContent className="flex justify-center mt-4">
          <Button onClick={() => signIn()}>Sign in</Button>
        </CardContent>
      </Card>
    </div>
  );
}
