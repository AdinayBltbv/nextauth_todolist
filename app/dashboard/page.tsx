import React from "react";
import TodoistClone from "../../components/TodoistClone";
import { getData } from "../../actions/todoAction";
import { Navbar } from "../../components/navbar";

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
