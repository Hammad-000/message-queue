import express from "express";
import myQueue from "./queue.js"; // 👈 add .js here

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const job = await myQueue.add("test-job", { message: "Hello BullMQ 🚀" });
  res.send({ status: "Job added", jobId: job.id });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});