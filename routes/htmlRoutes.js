const path = require("path");

const index = path.join(__dirname, "public", "index.html");
const notes = path.join(__dirname, "public", "notes.html");


// HTML Routing

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(index);
  });

  app.get("/notes", function(req, res) {
      res.sendFile(notes);
  });

// Default to home, if no matching routes
  app.get("*", function(req, res) {
      res.sendFile(index);
  })
};
