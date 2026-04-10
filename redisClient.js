import IORedis from "ioredis";

const client = new IORedis({
  host: "127.0.0.1",
  port: 6379,
  connectTimeout: 10000, // optional
});

client.on("connect", () => console.log("✅ Redis connected (ioredis)"));
client.on("error", (err) => console.log("Redis Error:", err));

export default client;