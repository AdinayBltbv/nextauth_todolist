"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Привет, {session.user?.name}</p>
        <button onClick={() => signOut()}>Выйти</button>
      </div>
    );
  }
  return <button onClick={() => signIn("google")}>Войти через Google</button>;
}
