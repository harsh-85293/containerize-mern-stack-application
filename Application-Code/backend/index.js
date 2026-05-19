const tasks = require("./routes/tasks");
const connection = require("./db");
const cors = require("cors");
const express = require("express");
const app = express();

let dbReady = false;

connection()
    .then(() => {
        dbReady = true;
    })
    .catch(() => {
        dbReady = false;
    });

app.use(express.json());
app.use(cors());

app.get("/healthz", (req, res) => {
    res.status(200).send("Healthy");
});

app.get("/ready", (req, res) => {
    if (dbReady) {
        res.status(200).send("Ready");
    } else {
        res.status(503).send("Not Ready");
    }
});

app.get("/started", (req, res) => {
    res.status(200).send("Started");
});

app.use("/api/tasks", tasks);

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Listening on port ${port}...`));
