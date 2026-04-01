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

app.get("/send-email", async (req, res) => {
  const job = await myQueue.add("email-job", {
    to: "pejac52333@fengnu.com",
    subject: "Test Email from BullMQ",
    message: "Hello! This email was sent using BullMQ and Node.js"
  });

  res.send({ status: "Email job added", jobId: job.id });
});