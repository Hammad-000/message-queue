import { Queue, Worker } from "bullmq";
import nodemailer from "nodemailer";

// Create a queue
const emailQueue = new Queue("emailQueue", {
  connection: { host: "localhost", port: 6379 },
});

// Nodemailer test account
const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

// Worker to process emails
const worker = new Worker(
  "emailQueue",
  async (job) => {
    const { to, subject, message } = job.data;

    const info = await transporter.sendMail({
      from: '"BullMQ Test" <no-reply@example.com>',
      to,
      subject,
      text: message,
    });

    console.log("✅ Email sent! Preview URL:", nodemailer.getTestMessageUrl(info));
  },
  { connection: { host: "localhost", port: 6379 } }
);

worker.on("failed", (job, err) => {
  console.error("❌ Job failed", job.id, err);
});

// import { Worker } from "bullmq";

// const worker = new Worker(
//   "my-queue",
//   async (job) => {
//     console.log("Processing job:", job.id, job.data);

//     // simulate work
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     return { result: "done" };
//   },
//   {
//     connection: {
//       host: "127.0.0.1",
//       port: 6379
//     }
//   }
// );

// worker.on("completed", (job) => {
//   console.log(`✅ Job ${job.id} completed`);
// });

// worker.on("failed", (job, err) => {
//   console.log(`❌ Job ${job.id} failed`, err);
// });