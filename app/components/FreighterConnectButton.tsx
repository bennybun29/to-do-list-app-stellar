"use client";

import { Button, HStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useToDoContract } from "@/app/context/ToDoContractContext";
import { DialogBox } from "./Daialog";

const FreighterConnectButton = () => {
  const { connected, address, error, connect, loading, clearError } =
    useToDoContract();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Show dialog when error occurs
  useEffect(() => {
    if (error) {
      setIsDialogOpen(true);
    }
  }, [error]);

  const handleConnect = async () => {
    await connect();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    clearError();
  };

  return (
    <HStack gap={3} align="center">
      <DialogBox
        title="Freighter connection failed"
        desc={error || "Failed to connect"}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      />
      <Button
        colorScheme="teal"
        size="sm"
        onClick={handleConnect}
        loading={loading}
        loadingText="Connecting"
        disabled={connected || loading}
      >
        {connected ? "Freighter Connected" : "Connect Freighter"}
      </Button>
      {address && (
        <Text fontSize="sm" color="gray.500">
          {address.slice(0, 5)}...{address.slice(-4)}
        </Text>
      )}
    </HStack>
  );
};

export default FreighterConnectButton;
