import prisma from "../../lib/prisma.ts";
import express from "express";

const router = express.Router();

// should only be adding 1 data for hero section
router.get("/:id", async (req, res) => {
  try {
    const hero = await prisma.hero.findFirst();
    res.json(hero);
  } catch (error) {
    console.error("Error fetching hero section:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the hero section." });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const newHero = await prisma.hero.create({
      data: data,
    });
    res.json(newHero);
  } catch (error) {
    console.error("Error creating hero section:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the hero section." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.hero.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Hero section deleted successfully." });
  } catch (error) {
    console.error("Error deleting hero section:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the hero section." });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedData = await prisma.hero.update({
      where: { id: parseInt(id) },
      data: data,
    });
    res.json(updatedData);
  } catch (error) {
    console.error("Error updating hero section:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the hero section." });
  }
});

export default router;
