"use client";

import { useState, useCallback } from "react";
import { Client, TaskItem, TaskStatus } from "to_do_list_v2";
import { initializeToDoContract } from "@/app/lib/freighter";
import { contractOps } from "@/app/services/contractService";

export const useTodoContract = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

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
      const result = await contractOps.listTasks(client, address!);
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
        await contractOps.createTask(client, address!, title);
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
        await contractOps.setStatus(client, address!, id, status);
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
        await contractOps.deleteTask(client, address!, id);
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
        await contractOps.updateTask(client, address!, id, title, status);
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

  return {
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
  };
};
