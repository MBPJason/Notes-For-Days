const express = require("express");
const fs = require("fs");

const app = express();
const path  = require("path");

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.join(__dirname, "public", "./db/db.json"));
});

// Listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

app.post("/api/notes", function(req, res) {
    try {
        let notesData = fs.readFileSync("./db/db.json", "utf8");
        console.log(notesData);
        notesData = JSON.parse(notesData);
        req.body.id = notesData.length;
        notesData.push(req.body);
        notesData = JSON.stringify(notesData);
        fs.writeFile("./db/db.json", notesData, "utf8", function (error) {
            if (error) throw error;
        });

        res.json(JSON.parse(notesData));
    } catch (error) {
        console.log("Darn monkeys they left a mess of things");
        console.log(error);
    }
})

app.delete("/api/notes/:id", function(req, res) {
    try {
        notesData = fs.readFileSync("./db/db.json", "utf8");
        notesData = JSON.parse(notesData);
        notesData = (notesData).filter(function)
    } catch (error) {
        
    }

})
