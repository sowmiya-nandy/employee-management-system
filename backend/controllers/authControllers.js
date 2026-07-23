const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    console.log("LOGIN API HIT");
    console.log(req.body);

    try {
        const { email, password } = req.body;

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        console.log(result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user
        });

    } catch (error) {
        console.log("LOGIN ERROR:");
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { login };