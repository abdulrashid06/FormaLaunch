
require('dotenv').config();
const express = require('express');
const { PostModel } = require('../model/post.model');
const nodemailer = require('nodemailer');

const PostRouter = express.Router();

PostRouter.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const existingUser = await PostModel.findOne({ email });

        if (!existingUser) {
            const newUser = new PostModel({ name, email, message, count: 1 });
            await newUser.save();
            await emailposting(name, email, message);
        } else {
            const newUser = new PostModel({ name, email, message, count: existingUser.count + 1 });
            await newUser.save();
            await emailposting(name, email, message);
        }

        res.status(201).send({ msg: "true" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ msg: "An error occurred" });
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.email',
    port: 465,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

function emailposting(name, email, message) {
    const subject = "New Connection Request";
    const text = `Hello,\n\nYou have received a new connection request from ${name} (${email}).\n\nMessage: ${message}`;

    const html = `
    <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
      <h2 style="color: #333;">New Connection Request - Law Connect</h2>
      <p>Hello,</p>
      <p>You have received a new connection request from:</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="background-color: #fff; padding: 10px; border-radius: 5px;">${message}</p>
    </div>
    `;

    transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: "jatinlalit010@gmail.com",
        subject: subject,
        text: text,
        html: html
    })
    .then(() => {
        console.log("Email sent successfully");
    })
    .catch((err) => {
        console.error("Failed to send email:", err);
    });
}

module.exports = { PostRouter };
