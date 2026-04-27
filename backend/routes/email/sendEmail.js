import express from "express";
import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const router = express.Router();

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILTRAP_API_TOKEN,
  }),
);

router.post("/", async (req, res) => {
  const { name, subject, message } = req.body;

  if (!name || !subject || !message) {
    return res
      .status(400)
      .json({ error: "name, subject, and message are required." });
  }

  if (!process.env.MAILTRAP_API_TOKEN) {
    throw new Error("MAILTRAP_API_TOKEN is not set in environment variables.");
  }

  const transport = Nodemailer.createTransport(
    MailtrapTransport({
      token: process.env.MAILTRAP_API_TOKEN,
    }),
  );

  try {
    await transport.sendMail({
      from: { name: "Portfolio", address: "hello@demomailtrap.com" },
      to: [{ address: "nevojnarim@gmail.com" }],
      subject,
      text: `From: ${name}\n\n${message}`,
      html: `<p><strong>From:</strong> ${name}</p><p>${message}</p>`,
    });

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Mailtrap error:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

export default router;
