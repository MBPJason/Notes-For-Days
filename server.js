const express = require("express");
// Making an express server
const app = express();

// Sets up a port to work with
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes, it gives a map for user response
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Listener, starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
