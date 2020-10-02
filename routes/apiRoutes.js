const path = require("path");
const fs = require("fs");

// Auto parse the JSON file, stores it in cache
const notesDB = require("./db/db.json");

const pathNotesDB = path.join(__dirname, "./db/db.json");

// API Calls Routing

module.exports = function (app) {
  // GET requests
  app.get("/api/notes", function (req, res) {
    res.sendFile(pathNotesDB);
  });

  // POST requests
  app.post("/api/notes", function (req, res) {
    try {
      notesID = 0;
      notesDB.forEach((note) => {
          notesID++;
          note.id = notesID;
      });

      req.body.id = notesID + 1;
      notesDB.push(req.body);

      fs.writeFile(pathNotesDB, JSON.stringify(notesDB), (err) => {
          if (err) throw err;
      });

      res.json(req.body);
    } catch (err) {
      console.log("Darn monkeys, they left a mess of things");
      console.log(err);
    }
  });

//   DELETE Requests

  app.delete("/api/notes/:id", function(req, res) {
      try {
          newNotesArr = notesDB.filter((note) => note.id != req.params.id);
          fs.writeFile(pathNotesDB, JSON.stringify(newNotesArr), "utf8", (err) => {
              if (err) throw err;
          })
      } catch (err) {
        console.log("Darn monkeys they left a mess of things");
        console.log(err);
      }
  })
};
