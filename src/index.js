import { createServer } from "./app";
import http from "http";

async function startServer() {
  const app = createServer();

  const server = http.createServer(app).listen(
    {
      port: process.env.PORT || 4000,
    },
    async () => {
      const info = server.address();
      console.log(`Server ready at http://localhost:${info.port}`);
    }
  );
}

startServer();
