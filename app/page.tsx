import { Box, Container, HStack, Heading } from "@chakra-ui/react";
import ColorButton from "./components/ColorButton";

export default function Home() {
  return (
    <Container>
      <HStack p={10} justify="space-between">
        <Heading>Welcome to StellarDo!</Heading>
        <ColorButton />
      </HStack>
      <Box textAlign="center" p={10}>
        Decentralized To Do List App for You!
      </Box>
    </Container>
  );
}
