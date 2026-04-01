import express from "express";
import redisClient from "./redisClient.js";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  await redisClient.set("message", "Hello from Redis!");
  const value = await redisClient.get("message");

  res.send({
    status: "Server running",
    redisValue: value
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});