const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    // console.log(req.headers);
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication.");
    }
    try {
        // console.log(req.user);
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
        console.log(req.user, "\n", decoded);
    } catch (err) {
        return res.status(401).send("Invalid Token", err);
    }

    return next();
}

module.exports = verifyToken;