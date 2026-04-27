import prisma from "../../lib/prisma.ts";
import express from "express";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const about = await prisma.about.findFirst({
      where: { id: parseInt(id) },
    });
    res.status(200).json(about);
  } catch (error) {
    console.error("Error fetching about section:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the about section." });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const newAbout = await prisma.about.create({
      data: data,
    });
    res.status(201).json(newAbout);
  } catch (error) {
    console.error("Error creating about section:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the about section." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.about.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "About section deleted successfully." });
  } catch (error) {
    console.error("Error deleting about section:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the about section." });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedData = await prisma.about.update({
      where: { id: parseInt(id) },
      data: data,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    console.error("Error updating about section:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the about section." });
  }
});

export default router;
