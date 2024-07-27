const jwt = require('jsonwebtoken');

const generatetoken = (userid, res) => {
    const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    });

    return token;
};


const generatetokenforemployee = (userid, res) => {
    const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie("jwtemployee", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    });

    return token;
};
module.exports = { generatetoken,generatetokenforemployee };
