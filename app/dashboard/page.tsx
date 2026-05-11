import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page.</p>
      <NextLink href="/">
        <Button colorPalette="blue">Go Back</Button>
      </NextLink>
    </div>
  );
}
