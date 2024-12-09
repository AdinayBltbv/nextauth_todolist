import React from "react";
import { Navbar } from "@/components/navbar";
import { getData } from "@/actions/todoAction";
import TodoistClone from "../../components/TodoistClone";

export default async function Dashboard() {
  const data = await getData();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4">
        <TodoistClone todos={data} />
      </main>
    </div>
  );
}
