import { Worker } from "bullmq";

const worker = new Worker(
  "my-queue",
  async (job) => {
    console.log("Processing job:", job.id, job.data);

    // simulate work
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { result: "done" };
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379
    }
  }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`❌ Job ${job.id} failed`, err);
});