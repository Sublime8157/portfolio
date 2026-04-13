import prisma from "../lib/prisma.ts";
import express from "express";

const router = express.Router();

// Get all experiences
router.get("/", async (req, res) => {
  try {
    const experiences = await prisma.experiences.findMany({
      include: {
        stack: true, // Include related experience_stack data
      },
    });
    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching experiences." });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const newExperience = await prisma.experiences.create({
      data: data,
    });
    res.status(201).json(newExperience);
  } catch (error) {
    console.error("Error creating experience:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the experience." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.experiences.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Experience removed successfully." });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({
      error: "An error occurred while deleting the experience.",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedExperience = await prisma.experiences.update({
      where: { id: parseInt(id) },
      data: data,
    });
    res.status(200).json(updatedExperience);
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({
      error: "An error occurred while updating the experience.",
    });
  }
});

export default router;
