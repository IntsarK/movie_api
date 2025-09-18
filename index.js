const express = require("express");
const mongoose = require("mongoose");
const { Movie, User } = require("./models.js");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/movies/:Title", async (req, res) => {
  try {
    const movie = await Movie.findOne({ Title: req.params.Title });
    if (!movie) return res.status(404).send("Movie not found");
    res.json(movie);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/genres/:Name", async (req, res) => {
  try {
    const movie = await Movie.findOne({ "Genre.Name": req.params.Name });
    if (!movie) return res.status(404).send("Genre not found");
    res.json(movie.Genre);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/directors/:Name", async (req, res) => {
  try {
    const movie = await Movie.findOne({ "Director.Name": req.params.Name });
    if (!movie) return res.status(404).send("Director not found");
    res.json(movie.Director);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/users", async (req, res) => {
  try {
    const existingUser = await User.findOne({ Username: req.body.Username });
    if (existingUser)
      return res.status(400).send(req.body.Username + " already exists");

    req.body.Password = User.hashPassword(req.body.Password);

    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/users/:Username", async (req, res) => {
  try {
    const user = await User.findOne({ Username: req.params.Username });
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/users/:Username", async (req, res) => {
  try {
    if (req.body.Password) {
      req.body.Password = User.hashPassword(req.body.Password);
    }
    const updatedUser = await User.findOneAndUpdate(
      { Username: req.params.Username },
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/users/:Username/movies/:MovieID", async (req, res) => {
  try {
    const user = await User.findOne({ Username: req.params.Username });
    if (!user.FavoriteMovies.includes(req.params.MovieID)) {
      user.FavoriteMovies.push(req.params.MovieID);
      await user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/users/:Username/movies/:MovieID", async (req, res) => {
  try {
    const user = await User.findOne({ Username: req.params.Username });
    user.FavoriteMovies = user.FavoriteMovies.filter(
      (id) => id.toString() !== req.params.MovieID
    );
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/users/:Username", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      Username: req.params.Username,
    });
    if (!deletedUser) return res.status(404).send("User not found");
    res.send("User deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(8080, () => console.log("Server running on port 8080"));
