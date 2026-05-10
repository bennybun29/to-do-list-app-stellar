import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { Poppins } from "next/font/google";

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
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
