const { createClient } = require("redis");

let redisClient;

if (process.env.NODE_ENV === "test") {

    redisClient = {
        get: async () => null,
        set: async () => "OK",
        del: async () => 1
    };

} else {

    redisClient = createClient({
        url: process.env.REDIS_URL
    });


    redisClient.on("connect", () => {
        console.log("✅ Redis Connected");
    });


    redisClient.on("error", (err) => {
        console.log("❌ Redis Error:", err);
    });


    redisClient.connect();

}


module.exports = redisClient;