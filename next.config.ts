import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    resolveAlias: {
      to_do_list: "./packages/to_do_list",
    },
  },
};

export default nextConfig;
