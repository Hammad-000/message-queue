import { Queue } from "bullmq";

const myQueue = new Queue("my-queue", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
});

export default myQueue;