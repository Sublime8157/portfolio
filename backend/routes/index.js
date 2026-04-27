import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url"; // 👈 add pathToFileURL

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function registerRoutes(router, dirPath, baseRoute = "") {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await registerRoutes(router, fullPath, `${baseRoute}/${entry.name}`);
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".js") &&
      entry.name !== "index.js"
    ) {
      const routeName = path.parse(entry.name).name;
      const routePath = `${baseRoute}/${routeName}`;
      const fileUrl = pathToFileURL(fullPath).href; // 👈 convert to file:// URL
      const module = await import(fileUrl);
      router.use(routePath, module.default);
    }
  }
}

await registerRoutes(router, __dirname);

export default router;
