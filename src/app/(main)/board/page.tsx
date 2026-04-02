"use client";

import { useEffect, useState } from "react";

type Task = {
  id: string;
  taskNumber: number;
  title: string;
  status: string;
  priority: string;
  project: {
    key: string;
  };
  assignee: {
    name: string;
  } | null;
};

const COLUMNS = [
  { id: "BACKLOG", title: "バックログ", color: "border-muted" },
  { id: "TODO", title: "TODO", color: "border-info" },
  { id: "IN_PROGRESS", title: "進行中", color: "border-warning" },
  { id: "IN_REVIEW", title: "レビュー中", color: "border-secondary" },
  { id: "DONE", title: "完了", color: "border-success" },
];

const BoardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "border-l-4 border-l-danger";
      case "HIGH":
        return "border-l-4 border-l-warning";
      case "MEDIUM":
        return "border-l-4 border-l-info";
      default:
        return "";
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
    <div className="h-full p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">カンバンボード</h1>
        <p className="mt-2 text-muted-foreground">
          タスクをステータス別に管理
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          return (
            <div
              key={column.id}
              className="flex-shrink-0 w-80 rounded-lg border border-border bg-card"
            >
              <div
                className={`border-b-2 ${column.color} bg-muted/50 px-4 py-3`}
              >
                <h3 className="font-semibold text-foreground">
                  {column.title}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({columnTasks.length})
                  </span>
                </h3>
              </div>

              <div className="space-y-3 p-4 min-h-[200px]">
                {columnTasks.length === 0 ? (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    タスクなし
                  </p>
                ) : (
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`rounded-md border border-border bg-background p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      <div className="mb-2 flex items-start justify-between">
                        <span className="text-xs text-muted-foreground">
                          {task.project.key}-{task.taskNumber}
                        </span>
                        {task.priority !== "NONE" && (
                          <span className="text-xs font-medium text-muted-foreground">
                            {task.priority}
                          </span>
                        )}
                      </div>
                      <h4 className="mb-2 text-sm font-medium text-foreground">
                        {task.title}
                      </h4>
                      {task.assignee && (
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                            {task.assignee.name.charAt(0)}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {task.assignee.name}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardPage;
