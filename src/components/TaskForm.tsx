"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Save } from "lucide-react";

interface TaskFormProps {
  addTask: (text: string) => void;
  editTask: (id: number, newText: string) => void;
  editingTask: { id: number; text: string } | null;
}

export default function TaskForm({
  addTask,
  editTask,
  editingTask,
}: TaskFormProps) {
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (editingTask) {
      setNewTask(editingTask.text);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      if (editingTask) {
        editTask(editingTask.id, newTask.trim());
      } else {
        addTask(newTask.trim());
      }
      setNewTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <Input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder={editingTask ? "Edit task" : "Add a new task"}
        className="flex-grow mr-2"
      />
      <Button type="submit" className="flex items-center">
        {editingTask ? (
          <>
            <Save className="w-4 h-4 mr-2" />
            Save
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </>
        )}
      </Button>
    </form>
  );
}
