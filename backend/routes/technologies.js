import prisma from "../lib/prisma.ts";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const technologies = await prisma.technologies.findMany();
    res.json(technologies);
  } catch (error) {
    console.error("Error fetching technologies:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching technologies." });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const newTechnology = await prisma.technologies.create({
      data: data,
    });
    res.json(newTechnology);
  } catch (error) {
    console.error("Error creating technology:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the technology." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.technologies.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Technology deleted successfully." });
  } catch (error) {
    console.error("Error deleting technology:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the technology." });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedTechnology = await prisma.technologies.update({
      where: { id: parseInt(id) },
      data: data,
    });
    res.json(updatedTechnology);
  } catch (error) {
    console.error("Error updating technology:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the technology." });
  }
});

export default router;
