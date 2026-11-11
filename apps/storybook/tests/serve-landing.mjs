import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const landingDirectory = resolve(
  fileURLToPath(new URL("../../landing/dist/", import.meta.url)),
);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

createServer((request, response) => {
  const requestPath = new URL(request.url ?? "/", "http://localhost").pathname;
  const relativePath = requestPath.startsWith("/marisma/")
    ? requestPath.slice("/marisma/".length)
    : "";
  const candidate = resolve(landingDirectory, normalize(relativePath));
  const filePath = candidate.startsWith(landingDirectory)
    ? candidate
    : landingDirectory;
  const resolvedPath =
    existsSync(filePath) && statSync(filePath).isFile()
      ? filePath
      : join(landingDirectory, "index.html");

  response.setHeader(
    "content-type",
    contentTypes[extname(resolvedPath)] ?? "application/octet-stream",
  );
  createReadStream(resolvedPath).pipe(response);
}).listen(4173, "127.0.0.1");
