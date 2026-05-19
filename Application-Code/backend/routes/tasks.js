const express = require("express");
const { getPool } = require("../db");

const router = express.Router();

const mapTask = (row) => ({
    _id: String(row.id),
    id: row.id,
    task: row.task,
    completed: row.completed,
});

router.post("/", async (req, res) => {
    try {
        const { task } = req.body;
        const result = await getPool().query(
            "INSERT INTO tasks (task) VALUES ($1) RETURNING *",
            [task]
        );
        res.send(mapTask(result.rows[0]));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        const result = await getPool().query(
            "SELECT * FROM tasks ORDER BY id ASC"
        );
        res.send(result.rows.map(mapTask));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { completed, task } = req.body;
        const result = await getPool().query(
            `UPDATE tasks
             SET completed = COALESCE($1, completed),
                 task = COALESCE($2, task)
             WHERE id = $3
             RETURNING *`,
            [completed, task, req.params.id]
        );
        if (!result.rows.length) {
            return res.status(404).send("Task not found");
        }
        res.send(mapTask(result.rows[0]));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const result = await getPool().query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [req.params.id]
        );
        if (!result.rows.length) {
            return res.status(404).send("Task not found");
        }
        res.send(mapTask(result.rows[0]));
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
