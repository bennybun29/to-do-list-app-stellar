"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import * as freighter from "@stellar/freighter-api";
import { Client, TaskItem, TaskStatus } from "to_do_list_v2";
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
  clearError: () => void;
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
      console.log("Starting Freighter connection...");
      const { contract, address: walletAddress } =
        await initializeToDoContract();
      console.log("Connection successful:", walletAddress);
      setClient(contract);
      setAddress(walletAddress);
      setConnected(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Connection failed";
      console.error("Connection error:", errorMessage);
      setError(errorMessage);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadTasks = useCallback(async () => {
    if (!client || !address) return;
    try {
      setLoading(true);
      setError(null);
      const result = await contractOps.listTasks(client, address);
      setTasks(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load tasks";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [client, address]);

  const addTask = useCallback(
    async (title: string) => {
      if (!client || !address) return;
      try {
        setLoading(true);
        setError(null);
        await contractOps.createTask(client, address, title);
        await loadTasks();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create task";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [client, address, loadTasks],
  );

  const updateTaskStatus = useCallback(
    async (id: bigint, status: TaskStatus) => {
      if (!client || !address) return;
      try {
        setLoading(true);
        setError(null);
        await contractOps.setStatus(client, address, id, status);
        await loadTasks();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update status";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [client, address, loadTasks],
  );

  const removeTask = useCallback(
    async (id: bigint) => {
      if (!client || !address) return;
      try {
        setLoading(true);
        setError(null);
        await contractOps.deleteTask(client, address, id);
        await loadTasks();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete task";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [client, address, loadTasks],
  );

  const updateTask = useCallback(
    async (id: bigint, title: string, status: TaskStatus) => {
      if (!client || !address) return;
      try {
        setLoading(true);
        setError(null);
        await contractOps.updateTask(client, address, id, title, status);
        await loadTasks();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update task";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [client, address, loadTasks],
  );

  // Set mounted flag for client-side only
  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for Freighter account changes
  useEffect(() => {
    if (!mounted || !connected) return;

    const checkAccountChange = async () => {
      try {
        const result = (await freighter.getAddress()) as { address: string };
        const currentAddress = result.address;

        if (currentAddress && currentAddress !== address) {
          console.log("Account changed from", address, "to", currentAddress);
          // Reconnect with the new account
          await connect();
        }
      } catch (err) {
        // Account change check failed - user may have disconnected from Freighter
        console.log("Account check failed:", err);
      }
    };

    // Check for account changes every 2 seconds
    const interval = setInterval(checkAccountChange, 2000);

    return () => clearInterval(interval);
  }, [mounted, connected, address, connect]);

  // Load tasks when client changes (e.g., after account switch)
  useEffect(() => {
    if (client && connected) {
      loadTasks();
    }
  }, [client, connected, loadTasks]);

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
        clearError,
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
