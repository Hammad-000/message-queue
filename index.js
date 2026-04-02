import express from "express";
import emailQueue from "./queue.js"; 

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const job = await emailQueue.add("test-job", { message: "Hello BullMQ 🚀" });
  res.send({ status: "Job added", jobId: job.id });
});

app.get("/send-email", async (req, res) => {
  const job = await emailQueue.add("email-job", {
    to: "pejac52333@fengnu.com",
    subject: "Test Email from BullMQ",
    message: "Hello! My name is Hammad, what's yours?"
  });

  res.send({ status: "Email job added", jobId: job.id });
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));