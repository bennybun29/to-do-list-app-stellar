"use client";

import { useState, useEffect } from "react";
import {
  Button,
  VStack,
  HStack,
  Input,
  Heading,
  Box,
  Text,
  Container,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useToDoContract } from "@/app/context/ToDoContractContext";
import { TaskStatus } from "to_do_list";
import ColorButton from "@/app/components/ColorButton";

export default function Dashboard() {
  const {
    tasks,
    loading,
    error,
    connected,
    loadTasks,
    addTask,
    updateTaskStatus,
    removeTask,
  } = useToDoContract();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Load tasks when component mounts
  useEffect(() => {
    if (connected) {
      loadTasks();
    }
  }, [connected, loadTasks]);

  // Detect dark mode
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleCreateTask = async () => {
    if (newTaskTitle.trim()) {
      setIsCreating(true);
      try {
        await addTask(newTaskTitle);
        setNewTaskTitle("");
      } finally {
        setIsCreating(false);
      }
    }
  };

  const handleStatusChange = (taskId: bigint, newStatus: string) => {
    const status: TaskStatus = { tag: newStatus as any, values: undefined };
    updateTaskStatus(taskId, status);
  };

  const handleDeleteTask = async (taskId: bigint) => {
    await removeTask(taskId);
  };

  if (!connected) {
    return (
      <Container maxW="container.md" py={10}>
        <Box
          p={4}
          bg="yellow.50"
          borderRadius="md"
          borderLeft="4px"
          borderColor="yellow.500"
        >
          <Text>Please connect your wallet first</Text>
        </Box>
        <Button asChild mt={4} colorScheme="blue">
          <NextLink href="/">Go Back</NextLink>
        </Button>
      </Container>
    );
  }

  const selectStyles = {
    width: "120px",
    padding: "0.5rem",
    borderRadius: "0.375rem",
    border: isDark ? "1px solid #4a5568" : "1px solid #e2e8f0",
    color: isDark ? "#ffffff" : "#000000",
    backgroundColor: isDark ? "#2d3748" : "#ffffff",
  };

  return (
    <Container maxW="container.lg" py={10}>
      <VStack gap={6} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading>My Tasks</Heading>
          <HStack gap={2}>
            <ColorButton />
            <Button asChild colorScheme="blue" size="sm">
              <NextLink href="/">Go Back</NextLink>
            </Button>
          </HStack>
        </Flex>

        {error && (
          <Box
            p={4}
            bg="red.50"
            borderRadius="md"
            borderLeft="4px"
            borderColor="red.500"
          >
            <Text color="red.800">{error}</Text>
          </Box>
        )}

        {/* Create Task Section */}
        <Box p={4} borderWidth={1} borderRadius="md" borderColor="gray.200">
          <Heading size="md" mb={3}>
            Create New Task
          </Heading>
          <HStack gap={2}>
            <Input
              placeholder="Enter task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleCreateTask()}
              disabled={isCreating || loading}
            />
            <Button
              onClick={handleCreateTask}
              colorScheme="green"
              loading={isCreating || loading}
              disabled={!newTaskTitle.trim()}
            >
              Add
            </Button>
          </HStack>
        </Box>

        {/* Tasks List Section */}
        <Box>
          <Heading size="md" mb={3}>
            Your Tasks ({tasks.length})
          </Heading>

          {loading && !tasks.length ? (
            <Flex justify="center" p={8}>
              <Spinner />
            </Flex>
          ) : tasks.length === 0 ? (
            <Text color="gray.500" textAlign="center" py={8}>
              No tasks yet. Create one to get started!
            </Text>
          ) : (
            <VStack gap={2} align="stretch">
              {tasks.map((task) => (
                <Box
                  key={Number(task.id)}
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  borderColor="gray.200"
                  _hover={{ borderColor: "gray.300" }}
                >
                  <HStack justify="space-between" gap={3}>
                    <VStack align="start" flex={1}>
                      <Text fontWeight="bold">{task.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        ID: {Number(task.id)}
                      </Text>
                    </VStack>

                    <select
                      style={selectStyles}
                      onChange={(e) =>
                        handleStatusChange(
                          task.id,
                          e.target.value as "Todo" | "InProgress" | "Done",
                        )
                      }
                      disabled={loading}
                      value={task.status.tag}
                    >
                      <option value="Todo">To Do</option>
                      <option value="InProgress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>

                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteTask(task.id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      </VStack>
    </Container>
  );
}
