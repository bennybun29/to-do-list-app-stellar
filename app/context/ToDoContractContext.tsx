"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Client, TaskItem, TaskStatus } from "to_do_list";
import { initializeToDoContract } from "@/app/lib/freighter";
import { contractOps } from "@/app/services/contractService";

interface ToDoContractContextType {
  client: Client | null;
  address: string | null;
  tasks: TaskItem[];
  loading: boolean;
  error: string | null;
  connected: boolean;
  connect: () => Promise<void>;
  loadTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  updateTask: (id: bigint, title: string, status: TaskStatus) => Promise<void>;
  updateTaskStatus: (id: bigint, status: TaskStatus) => Promise<void>;
  removeTask: (id: bigint) => Promise<void>;
}

const ToDoContractContext = createContext<ToDoContractContextType | undefined>(
  undefined,
);

export function ToDoContractProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client, setClient] = useState<Client | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  const connect = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { contract, address: walletAddress } =
        await initializeToDoContract();
      setClient(contract);
      setAddress(walletAddress);
      setConnected(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Connection failed";
      setError(errorMessage);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTasks = useCallback(async () => {
    if (!client) return;
    try {
      setLoading(true);
      setError(null);
      const result = await contractOps.listTasks(client);
      setTasks(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load tasks";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [client]);

  const addTask = useCallback(
    async (title: string) => {
      if (!client) return;
      try {
        setLoading(true);
        setError(null);
        await contractOps.createTask(client, title);
        await loadTasks();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create task";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [client, loadTasks],
  );

  const updateTaskStatus = useCallback(
    async (id: bigint, status: TaskStatus) => {
      if (!client) return;
      try {
        setLoading(true);
        setError(null);
        await contractOps.setStatus(client, id, status);
        await loadTasks();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update status";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [client, loadTasks],
  );

  const removeTask = useCallback(
    async (id: bigint) => {
      if (!client) return;
      try {
        setLoading(true);
        setError(null);
        await contractOps.deleteTask(client, id);
        await loadTasks();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete task";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [client, loadTasks],
  );

  const updateTask = useCallback(
    async (id: bigint, title: string, status: TaskStatus) => {
      if (!client) return;
      try {
        setLoading(true);
        setError(null);
        await contractOps.updateTask(client, id, title, status);
        await loadTasks();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update task";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [client, loadTasks],
  );

  // Set mounted flag for client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ToDoContractContext.Provider
      value={{
        client,
        address,
        tasks,
        loading,
        error,
        connected,
        connect,
        loadTasks,
        addTask,
        updateTask,
        updateTaskStatus,
        removeTask,
      }}
    >
      {children}
    </ToDoContractContext.Provider>
  );
}

export function useToDoContract() {
  const context = useContext(ToDoContractContext);
  if (!context) {
    throw new Error("useToDoContract must be used within ToDoContractProvider");
  }
  return context;
}
