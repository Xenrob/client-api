const express = require("express");
const router = express.Router();

const { insertUser, getUserByEmail } = require("../model/user/User.model");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt.helper");


const { json } = require("body-parser");

router.all("/", (req, res, next) => {
    //res.json({ message: "return from user router" });

    next();
});


// Create new user router
router.post("/", async(req, res, next) => {
    const { name, company, address, phone, email, password } = req.body

    try {
        //hash password
        const hashedPass = await hashPassword(password);

        const newUserObj = {
            name,
            company,
            address,
            phone,
            email,
            password: hashedPass
        };
        const result = await insertUser(newUserObj);
        console.log(result);

        res.json({ message: "New user created", result });
    } catch (error) {
        console.log(error);
        res.json({ statux: "error", message: error.message });
    }
});

//User sign in Router
router.post("/login", async(req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    //hashed the password  and compare with the one in db
    if (!email || !password) {
        return res.json({ status: "error", message: "Invalid form submition!" });
    }

    //get user with email from db
    const user = await getUserByEmail(email);

    //check user and password if existed
    const passFromDb = user && user._id ? user.password : null;

    if (!passFromDb)
        return res.json({ status: "error", message: "Invalid email or password!" });

    const result = await comparePassword(password, passFromDb);

    if (!result) {
        return res.json({ status: "error", message: "Invalid email or password!" });
    }


    const accessJWT = await createAccessJWT(user.email, `${user._id}`);
    const refresgJWT = await createRefreshJWT(user.email);

    res.json({
        status: "success",
        message: "Login Successful!",
        accessJWT,
        refresgJWT,
    });
});


module.exports = router;