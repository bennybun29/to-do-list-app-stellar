import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { Poppins } from "next/font/google";
import { ToDoContractProvider } from "./context/ToDoContractContext";
import GlobalWave from "./components/GlobalWave";

export const metadata: Metadata = {
  title: "To Do App",
  description: "Built with Chakra UI",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={poppins.className}>
        <ToDoContractProvider>
          <Provider>{children}</Provider>
          <GlobalWave />
        </ToDoContractProvider>
      </body>
    </html>
  );
}
