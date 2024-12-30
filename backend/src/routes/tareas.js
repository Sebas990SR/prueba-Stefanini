const express = require("express");
const router = express.Router();
const fs = require("fs");

// Obtener las tareas
router.get("/", (req, res) => {
  fs.readFile("./src/tareas.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Error obteniendo las tareas");
    res.json(JSON.parse(data));
  });
});

// Crear una tarea
router.post("/", (req, res) => {
  const newTask = req.body;
  fs.readFile("./src/tareas.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Error obteniendo las tareas");
    const tasks = JSON.parse(data);
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    fs.writeFile("./src/tareas.json", JSON.stringify(tasks), (err) => {
      if (err) return res.status(500).send("Error guardando la tarea");
      res.status(201).json(newTask);
    });
  });
});

// Eliminar una tarea
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./src/tareas.json", "utf-8", (err, data) => {
    if (err) return res.status(500).send("Error obteniendo las tareas");
    let tasks = JSON.parse(data);
    tasks = tasks.filter((task) => task.id != id);
    fs.writeFile("./src/tareas.json", JSON.stringify(tasks), (err) => {
      if (err) return res.status(500).send("Error eliminando la tarea");
      res.status(204).send();
    });
  });
});

module.exports = router;
