const express = require("express"),
  morgan = require("morgan");

const app = express();

let topMovies = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
  },
  {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    title: "Twilight",
    author: "Stephanie Meyer",
  },
];

app.use(morgan("common"));
app.use(express.static("public"));

// 1) Welcome message
// Method: GET
// URL: /
// Query params: none
// Body: none
// Returns: text message
app.get("/", (req, res) => {
  res.send("Welcome to myFlix API!");
});

// 2) Return all movies
// Method: GET
// URL: /movies
// Query params: none
// Body: none
// Returns: JSON array of movies [{ title, author }]
app.get("/movies", (req, res) => {
  res.json(topMovies);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
