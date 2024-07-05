const User = require('./../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
let controller = {};

controller.register = async (req, res) => {
    try {
        const oldUser = await User.findOne({ email: req.body.email });
        if (oldUser) {
            return res.status(409).send("User already Exist. Please login");
        }

        let encryptedPassword = await bcrypt.hash(req.body.password, 10);

        let user = new User(req.body);
        user.password = encryptedPassword;
        user.token = jwt.sign(
            { user_id: user._id, email: user.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        )

        let saveUserData = await user.save();
        res.status(201).json(saveUserData);

    } catch (err) {
        console.log(err);
    }
}

controller.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required.")
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            )

            user.token = token;

            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }

    } catch (err) {
        console.log(err);
    }
}

controller.welcome = (req, res) => {
    res.status(200).send("Welcome!!");
}

module.exports = controller;