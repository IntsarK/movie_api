const express = require("express");
const app = express();

app.use(express.json()); // lets you read JSON in request bodies

// 1) Return ALL movies
app.get("/movies", (req, res) => {
  res.send("Successful GET request returning data on all movies");
});

// 2) Return single movie by title
app.get("/movies/:title", (req, res) => {
  res.send(
    `Successful GET request returning data on the movie with title: ${req.params.title}`
  );
});

// 3) Return genre info by name
app.get("/genres/:name", (req, res) => {
  res.send(
    `Successful GET request returning data on the genre: ${req.params.name}`
  );
});

// 4) Return director info by name
app.get("/directors/:name", (req, res) => {
  res.send(
    `Successful GET request returning data on the director: ${req.params.name}`
  );
});

// 5) Register a new user
app.post("/users", (req, res) => {
  res.send("Successful POST request to register a new user");
});

// 6) Update a user’s info
app.put("/users/:username", (req, res) => {
  res.send(
    `Successful PUT request to update info for user: ${req.params.username}`
  );
});

// 7) Add a movie to favorites
app.post("/users/:username/favorites/:movieId", (req, res) => {
  res.send(
    `Successful POST request to add movie ID ${req.params.movieId} to favorites for user: ${req.params.username}`
  );
});

// 8) Remove a movie from favorites
app.delete("/users/:username/favorites/:movieId", (req, res) => {
  res.send(
    `Successful DELETE request to remove movie ID ${req.params.movieId} from favorites for user: ${req.params.username}`
  );
});

// 9) Deregister a user
app.delete("/users/:username", (req, res) => {
  res.send(`Successful DELETE request to remove user: ${req.params.username}`);
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
