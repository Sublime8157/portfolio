import prisma from "../lib/prisma.ts";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const trainings = await prisma.trainings.findMany({
      include: {
        stack: true,
      },
    });
    res.json(trainings);
  } catch (error) {
    console.error("Error fetching trainings:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching trainings." });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const newTraining = await prisma.trainings.create({
      data: data,
    });
    res.status(201).json(newTraining);
  } catch (error) {
    console.error("Error creating training:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the training." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.trainings.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Training deleted successfully." });
  } catch (error) {
    console.error("Error deleting training:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the training." });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const updatedTraining = await prisma.trainings.update({
      where: { id: parseInt(id) },
      data: data,
    });
    res.json(updatedTraining);
  } catch (error) {
    console.error("Error updating training:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the training." });
  }
});

export default router;
