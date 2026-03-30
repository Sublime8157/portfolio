import prisma from "../lib/prisma.ts";
import express from "express";

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await prisma.projects.findMany({
      include: {
        stack: true,
      },
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching projects." });
  }
});

// Create a new project
router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const newProject = await prisma.projects.create({
      data: data,
    });
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the project." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.projects.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Project removed successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      error: "An error occurred while deleting the project.",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedProject = await prisma.projects.update({
      where: { id: parseInt(id) },
      data: data,
    });
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      error: "An error occurred while updating the project.",
    });
  }
});

export default router;
