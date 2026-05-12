import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { Poppins } from "next/font/google";
import { ToDoContractProvider } from "./context/ToDoContractContext";
import GlobalWave from "./components/GlobalWave";
import SpaceBackground from "./components/SpaceBackground";

export const metadata: Metadata = {
  title: "SetllarDo",
  description: "To do list applicatiuon using Stellar Network",
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
          <SpaceBackground />
        </ToDoContractProvider>
      </body>
    </html>
  );
}
