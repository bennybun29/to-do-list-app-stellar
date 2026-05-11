"use client";

import {
  Box,
  Container,
  HStack,
  Heading,
  Button,
  VStack,
  Center,
} from "@chakra-ui/react";
import ColorButton from "./components/ColorButton";
import FreighterConnectButton from "./components/FreighterConnectButton";
import NextLink from "next/link";
import Image from "next/image";
import { LogoImage } from "./components/LogoImage";
import { useToDoContract } from "@/app/context/ToDoContractContext";

export default function Home() {
  const { connected } = useToDoContract();

  return (
    <Center h="100vh" flexDirection="column">
      <VStack p={10} gap={5} justify="space-between">
        <LogoImage />
        <Heading>Welcome to StellarDo!</Heading>
        <HStack my={3}>
          <FreighterConnectButton />
          <ColorButton />
        </HStack>
        {connected && (
          <NextLink href="/dashboard">
            <Button bg="yellow.500" size="lg" _hover={{ bg: "yellow.600" }}>
              Go to Dashboard
            </Button>
          </NextLink>
        )}
      </VStack>
    </Center>
  );
}
