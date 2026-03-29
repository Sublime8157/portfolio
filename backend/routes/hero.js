import prisma from "../lib/prisma.ts";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const hero = await prisma.hero.findFirst({
      where: { id: 1 },
    });
    res.json(hero);
  } catch (error) {
    console.error("Error fetching hero section:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the hero section." });
  }
});

router.post("/", async (req, res) => {
  const data = {
    title: "Test_Title",
    paragraph: "Test_Paragraph",
    image_url: "https://example.com/image.jpg",
  };

  try {
    const newData = await prisma.hero.create({
      data: data,
    });
    res.json(newData);
  } catch (error) {
    console.error("Error creating hero section:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the hero section." });
  }
});

export default router;
