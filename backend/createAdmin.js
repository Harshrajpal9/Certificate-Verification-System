const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/user");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (existingAdmin) {
            console.log(" Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        const admin = await User.create({
            name: "Admin",
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin",
        });

        console.log("Admin created successfully");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();