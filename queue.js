import { Queue } from "bullmq";

const emailQueue = new Queue("emailQueue", {
  connection: {
    host: "127.0.0.1",
    port: 6379
  }
});

export default emailQueue;