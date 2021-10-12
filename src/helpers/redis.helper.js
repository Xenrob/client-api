const redis = require("redis");
const client = redis.createClient();
//redis://localhost:6379

client.on("error", function(error) {
    console.error(error);
});

const setJWT = (key, value) => {
    console.log(typeof key, typeof value);
    return new Promise((resolve, reject) => {

        try {
            client.set("key", "value", (error, res) => {
                if (error) reject(error)
                resolve(res)
            })
        } catch (error) {
            reject(error);
        }

    });
};

const getJWT = (key) => {
    return new Promise((resolve, reject) => {

        try {
            client.get(key, value, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        } catch (error) {
            reject(error);
        }

    });
};

module.exports = {
    setJWT,
    getJWT,
};