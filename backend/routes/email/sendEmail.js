import express from "express";
import Nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.MAILTRAP_API_TOKEN,
  }),
);

const loadTemplate = (name, subject, message) => {
  const templatePath = path.join(
    __dirname,
    "../../templates/email/portfolio.html",
  );
  let html = fs.readFileSync(templatePath, "utf-8");

  const timestamp = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return html
    .replace("{{name}}", name)
    .replace("{{subject}}", subject)
    .replace("{{message}}", message)
    .replace("{{timestamp}}", timestamp);
};

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
    const html = loadTemplate(name, subject, message);

    await transport.sendMail({
      from: { name: "Portfolio", address: "hello@demomailtrap.com" },
      to: [{ address: "nevojnarim@gmail.com" }],
      subject,
      text: `From: ${name}\n\n${message}`,
      html,
    });

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Mailtrap error:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

export default router;
