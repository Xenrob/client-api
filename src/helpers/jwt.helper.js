const jwt = require('jsonwebtoken');
const { setJWT, getJWT } = require("./redis.helper");
const { storeUserRefreshJWT } = require("../model/user/User.model");

//access token
const createAccessJWT = async(email, _id) => {
    try {
        const accessJWT = await jwt.sign({ email },
            process.env.JWT_ACCESS_SECRETE, {
                expiresIn: "15m"
            });

        await setJWT(accessJWT, _id);

        return Promise.resolve(accessJWT);
    } catch (err) {
        return Promise.reject(error);
    }
};

//verify and refresh token
const createRefreshJWT = async(email, _id) => {

    try {
        const refreshJWT = jwt.sign({ email },
            process.env.JWT_ACCESS_SECRETE, { expiresIn: "30d" }
        );

        await storeUserRefreshJWT(_id, refreshJWT)
        return Promise.resolve(refreshJWT);
    } catch (error) {
        return Promise.reject(error)
    }

}

module.exports = {
    createAccessJWT,
    createRefreshJWT,
};