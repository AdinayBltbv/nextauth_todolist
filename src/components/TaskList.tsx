"use client";

import TaskItem from "./TaskItem";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  setEditingTask: (task: Task) => void;
}

export default function TaskList({
  tasks,
  toggleTask,
  deleteTask,
  setEditingTask,
}: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          setEditingTask={setEditingTask}
        />
      ))}
    </ul>
  );
}
