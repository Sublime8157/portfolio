import prisma from "../lib/prisma.ts";
import express from "express";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const projectId = parseInt(req.params.id);
  const { technology } = req.body;
  try {
    const newProjectStack = await prisma.projectStack.create({
      data: {
        projectId: projectId,
        technology: technology,
      },
    });
    res.status(201).json(newProjectStack);
  } catch (error) {
    console.error("Error creating project stack:", error);
    res.status(500).json({
      error: "An error occurred while creating project stack.",
    });
  }
});

router.delete("/:stackId", async (req, res) => {
  const stackId = req.params.stackId;
  try {
    await prisma.projectStack.deleteMany({
      where: {
        id: parseInt(stackId),
      },
    });
    res
      .status(200)
      .json({ message: "Stack removed from project successfully." });
  } catch (error) {
    console.error("Error removing stack from project:", error);
    res.status(500).json({
      error: "An error occurred while removing stack from project.",
    });
  }
});

router.put("/:stackId", async (req, res) => {
  const stackId = req.params.stackId;
  const { technology } = req.body;
  try {
    const updatedStack = await prisma.projectStack.update({
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
