const express = require("express");
const cors = require("cors");
const axios = require("axios");
// const { createProxyMiddleware } = require("http-proxy-middleware");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// wss.on("connection", function connection(ws) {
//   ws.on("message", function incoming(message) {
//     console.log("received: %s", message);
// });

// ws.send("something");
// });

// const corsOptions = {
// origin: "http://localhost:3000", // Explicitly allow this origin
//   credentials: true, // Now necessary since credentials include mode is used
//   optionsSuccessStatus: 204,
// };

app.use(cors());
app.use(express.json());

app.post("/execute", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.jdoodle.com/v1/execute",
      req.body
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/proxy", (req, res) => {
  const url = "https://api.jdoodle.com" + req.url;
  const options = {
    url: url,
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      // Add additional headers if needed
    },
  };

  req.pipe(request(options)).pipe(res);
});

// const wsProxy = createProxyMiddleware("/v1/stomp", {
//   target: "https://api.jdoodle.com/v1/stomp",
//   changeOrigin: true,
//   ws: true,
// });

// app.use(wsProxy);

// // Handle WebSocket upgrade separately
// server.on("upgrade", wsProxy.upgrade);

server.listen(3001, () => {
  console.log(`Server is running on port 4000`);
});
