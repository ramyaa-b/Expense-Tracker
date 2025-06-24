// exports.loginUser = (req, res) => {
//     res.json({ message: "Login endpoint hit" });
// };

// exports.registerUser = (req, res) => {
//     res.json({ message: "Register endpoint hit" });
// };
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generateToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET,{expiresIn:"1h"});
};  

exports.registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" }); 
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }      
        const user = await User.create({ fullName, email, password });
        res.status(201).json({
            id: user._id,      
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res
            .status(500)
            .json({ message: "Error registering user", error: err.message   });

    }
};
exports.loginUser = async (req, res) => {};
exports.getUserInfo = async (req, res) => {};
