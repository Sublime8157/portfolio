import prisma from "../lib/prisma.ts";
import express from "express";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const trainingId = req.params.id;
  const { technology } = req.body;
  try {
    const newTrainingStack = await prisma.trainingStack.create({
      data: {
        trainingId: parseInt(trainingId),
        technology: technology,
      },
    });
    res.status(201).json(newTrainingStack);
  } catch (error) {
    console.error("Error creating training stack:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the training stack." });
  }
});

router.delete("/:stackId", async (req, res) => {
  const stackId = req.params.stackId;
  try {
    await prisma.trainingStack.deleteMany({
      where: {
        id: parseInt(stackId),
      },
    });
    res
      .status(200)
      .json({ message: "Stack removed from training successfully." });
  } catch (error) {
    console.error("Error removing stack from training:", error);
    res.status(500).json({
      error: "An error occurred while removing stack from training.",
    });
  }
});

router.put("/:stackId", async (req, res) => {
  const stackId = req.params.stackId;
  const { technology } = req.body;
  try {
    const updatedStack = await prisma.trainingStack.update({
      where: {
        id: parseInt(stackId),
      },
      data: {
        technology,
      },
    });
    res.status(200).json(updatedStack);
  } catch (error) {
    console.error("Error updating stack:", error);
    res.status(500).json({
      error: "An error occurred while updating stack.",
    });
  }
});

export default router;
