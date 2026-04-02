"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Task = {
  id: string;
  taskNumber: number;
  title: string;
  status: string;
  priority: string;
  project: {
    id: string;
    name: string;
    key: string;
  };
  assignee: {
    id: string;
    name: string;
  } | null;
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const { data } = await res.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "BACKLOG":
        return "bg-muted text-muted-foreground";
      case "TODO":
        return "bg-info/10 text-info";
      case "IN_PROGRESS":
        return "bg-warning/10 text-warning";
      case "IN_REVIEW":
        return "bg-secondary/10 text-secondary";
      case "DONE":
        return "bg-success/10 text-success";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "text-danger";
      case "HIGH":
        return "text-warning";
      case "MEDIUM":
        return "text-info";
      case "LOW":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">タスク一覧</h1>
          <p className="mt-2 text-muted-foreground">
            全 {tasks.length} 件のタスク
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
        >
          + 新規タスク
        </button>
      </div>

      <div className="rounded-lg border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  タイトル
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  ステータス
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  優先度
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  担当者
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  プロジェクト
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center">
                    <p className="text-muted-foreground">
                      タスクがまだありません
                    </p>
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-muted/50 cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {task.project.key}-{task.taskNumber}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/tasks/${task.id}`}
                        className="text-sm font-medium text-foreground hover:text-primary"
                      >
                        {task.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-sm font-medium ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {task.assignee?.name || "未割り当て"}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {task.project.name}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
