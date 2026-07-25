import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const rootDirectory = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: rootDirectory,
  },
};

export default nextConfig;
