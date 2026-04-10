import { Worker } from "bullmq";
import nodemailer from "nodemailer";

console.log("🚀 Worker is starting...");

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

const worker = new Worker(
  "emailQueue", // matches queue.js
  async (job) => {
    console.log("📩 Job received:", job.name, job.data);

    const { to, subject, message } = job.data;

    const info = await transporter.sendMail({
      from: '"Hammad " <syedhammadahmed121@gmail.com>',
      to,
      subject,
      text: message,
    });

    console.log("✅ Email sent! Preview URL:", nodemailer.getTestMessageUrl(info));
  },
  {
    connection: {
      host: 'host.docker.internal',
      port: 6379
    }
  }
);

worker.on("completed", (job) => console.log(`✅ Job ${job.id} completed`));
worker.on("failed", (job, err) => console.error("❌ Job failed", job.id, err));