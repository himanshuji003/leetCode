const { createClient }  = require('redis');

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASS,
  socket: {
    host: "constant-important-enjoyable-72952.db.redis.io",
    port: 19199,
  },
});

// client.on("error", (err) => console.log("Redis Client Error", err));

// await client.connect();

// await client.set("foo", "bar");
// const result = await client.get("foo");
// console.log(result); // >>> bar
module.exports = redisClient;