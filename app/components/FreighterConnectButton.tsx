"use client";

import { Button, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { connectFreighter } from "../lib/freighter";
import { DialogBox } from "./Daialog";

const FreighterConnectButton = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const key = await connectFreighter();
      console.log("Connection successful, key:", key);
      setPublicKey(key);
    } catch (err) {
      console.error("Connection error:", err);
      const message = err instanceof Error ? err.message : "Failed to connect.";
      setError(message);
      setIsDialogOpen(true);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <HStack gap={3} align="center">
      <DialogBox
        title="Freighter connection failed"
        desc={`${error}`}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <Button
        colorScheme="teal"
        size="sm"
        onClick={handleConnect}
        loading={isConnecting}
        loadingText="Connecting"
        disabled={Boolean(publicKey)}
      >
        {publicKey ? "Freighter Connected" : "Connect Freighter"}
      </Button>
      {publicKey && (
        <Text fontSize="sm" color="gray.500">
          {publicKey.slice(0, 5)}...{publicKey.slice(-4)}
        </Text>
      )}
    </HStack>
  );
};

export default FreighterConnectButton;
