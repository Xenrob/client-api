const jwt = require('jsonwebtoken');

//access token
const createAccessJWT = (payload) => {

    const accessJWT = jwt.sign({ payload },
        process.env.JWT_ACCESS_SECRETE, { expiresIn: "15m" });

    return Promise.resolve(accessJWT);
}

//verify and refresh token
const createRefreshJWT = (payload) => {

    const refreshJWT = jwt.sign({ payload },
        process.env.JWT_ACCESS_SECRETE, { expiresIn: "30d" });

    return Promise.resolve(refreshJWT);
}

module.exports = {
    createAccessJWT,
    createRefreshJWT,
};