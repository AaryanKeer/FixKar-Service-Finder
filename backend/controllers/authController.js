const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// ✅ Register User
exports.registerUser = (req, res) => {
    console.log("Incoming Signup Request:", req.body);

    const { fullName, email, password, role, city } = req.body; // ✅ Changed from full_name to fullName

    // ✅ Validate input fields
    if (!fullName || !email || !password || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (role === "admin" && !city) {
        return res.status(400).json({ error: "City is required for admin" });
    }

    // ✅ Check if the email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error("Database Query Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        //debugging the password type and value remove this afterward
        console.log("Received password:", password);

        // ✅ Hash password before inserting
        bcrypt.hash(String(password), 10, (err, hashedPassword) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ error: "Server error while hashing password" });
            }

            // ✅ Insert user into the database
            const sql = "INSERT INTO users (fullName, email, password, role, city) VALUES (?, ?, ?, ?, ?)";
            db.query(sql, [fullName, email, hashedPassword, role, role === "admin" ? city : null], (err, result) => {
                if (err) {
                    console.error("Database Insert Error:", err);
                    return res.status(500).json({ error: "Database insert error" });
                }
                res.status(201).json({ message: "User registered successfully" });
            });
        });
    });
};

// ✅ Login User
exports.loginUser = (req, res) => {
    console.log("Incoming Login Request:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if (err) {
            console.error("Database Query Error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.length === 0) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const user = result[0];

        // ✅ Compare hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json({ error: "Password comparison error" });
            }
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            // ✅ Generate JWT token
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.json({ message: "Login successful", token, role: user.role });
        });
    });
};
