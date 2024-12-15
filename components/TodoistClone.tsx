"use client";

import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

import { todoType } from "../types/todoType";

import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleTodo,
} from "../actions/todoAction";
import { useSession } from "next-auth/react";

export default function TodoistClone() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<todoType[]>([]); // Используем todoType вместо Task

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <p className="text-center ">
        You need to be logged in to access your tasks.
      </p>
    );
  }

  if (!session) {
    return <p className="text-center">Unauthorized. Please log in.</p>;
  }

  const addTask = (text: string) => {
    const id = (tasks.at(-1)?.id || 0) + 1;
    setTasks([...tasks, { id, text, completed: false, isEditing: false }]);
    addTodo(id, text);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toggleTodo(id);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    deleteTodo(id);
  };

  const editTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText, isEditing: false } : task
      )
    );
    editTodo(id, newText);
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
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
