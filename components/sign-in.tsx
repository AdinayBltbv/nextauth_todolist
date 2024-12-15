"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSession, signIn } from "next-auth/react";
import { Separator } from "./ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { Button } from "./ui/button";
import { Github } from "lucide-react";

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Logged in user:", session?.user);
      router.push("/dashboard"); // Change '/dashboard' to your desired route
    }
  }, [status, router, session]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={() => signIn("github")}>
            <Github className="mr-2 h-4 w-4" />
            Sign in with GitHub
          </Button>
          <Button className="w-full" onClick={() => signIn("github")}>
            <Github className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>

          <Separator />
        </CardContent>
      </Card>
    </div>
  );
}
