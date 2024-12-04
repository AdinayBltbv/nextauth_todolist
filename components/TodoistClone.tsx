"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

export default function TodoistClone() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>You need to be logged in to access your tasks.</p>;
  }

  if (!session) {
    return <p>Unauthorized. Please log in.</p>;
  }

  const addTask = (text: string) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text, completed: false, isEditing: false },
    ]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
  };

  const startEditing = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  const cancelEditing = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: false } : task
      )
    );
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Todoist Clone</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
        onEditTask={editTask}
        onStartEditing={startEditing}
        onCancelEditing={cancelEditing}
      />
    </div>
  );
}
