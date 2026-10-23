const express = require("express");
const app = express();
require("dotenv").config();
const main = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/userAuth");
const redisClient = require("./config/redis");

app.use(express.json());
app.use(cookieParser());
app.use("/user", authRouter);

// const IntializeConnection = async()=>{
//     try{
//         await Promise.all([main(),redisClient.connect()])
//         console.log("Database connection successfully");

//         app.listen(process.env.PORT, () => {
//           console.log("Server listing on port number :" + process.env.PORT);
//         });
//     }
//     catch(err){
//         console.log("Error: "+err);
//     }
// }
// IntializeConnection();

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err.message);
});

const IntializeConnection = async () => {
  try {
    await main();
    console.log("Database connection successfully");

    await redisClient.connect();
    console.log("Redis connection successfully");

    app.listen(process.env.PORT, () => {
      console.log("Server listening on port number: " + process.env.PORT);
    });
  } catch (err) {
    console.error("Connection Error:", err);
  }
};

IntializeConnection();