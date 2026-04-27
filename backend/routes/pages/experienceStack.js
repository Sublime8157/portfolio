import prisma from "../../lib/prisma.ts";
import express from "express";

const router = express.Router();

router.post("/:id", async (req, res) => {
  const experienceId = parseInt(req.params.id);
  const { technology } = req.body;

  try {
    const experienceStack = await prisma.experienceStack.create({
      data: {
        experienceId: experienceId,
        technology: technology, // Assuming technology is the technology name
      },
    });
    res.status(201).json(experienceStack);
  } catch (error) {
    console.error("Error associating stack with experience:", error);
    res.status(500).json({
      error: "An error occurred while associating stack with experience.",
    });
  }
});

router.delete("/:stackId", async (req, res) => {
  const stackId = req.params.stackId;
  try {
    await prisma.experienceStack.deleteMany({
      where: {
        id: parseInt(stackId),
      },
    });
    res
      .status(200)
      .json({ message: "Stack removed from experience successfully." });
  } catch (error) {
    console.error("Error removing stack from experience:", error);
    res.status(500).json({
      error: "An error occurred while removing stack from experience.",
    });
  }
});

router.put("/:stackId", async (req, res) => {
  const stackId = req.params.stackId;
  const { technology } = req.body;
  try {
    const updatedStack = await prisma.experienceStack.update({
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
      error: "An error occurred while updating the stack.",
    });
  }
});

export default router;
