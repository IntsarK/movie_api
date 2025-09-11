DROP TABLE IF EXISTS User_Movies;
DROP TABLE IF EXISTS Movies;
DROP TABLE IF EXISTS Directors;
DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS Users;
-- Create Genres table
CREATE TABLE Genres (
    GenreID serial PRIMARY KEY,
    Name varchar(50) NOT NULL,
    Description varchar(1000)
);

-- Create Directors table
CREATE TABLE Directors (
    DirectorID serial PRIMARY KEY,
    Name varchar(50) NOT NULL,
    Bio varchar(1000),
    Birthyear date,
    Deathyear date
);

-- Create Movies table
CREATE TABLE Movies (
    MovieID serial PRIMARY KEY,
    Title varchar(50) NOT NULL,
    Description varchar(1000),
    DirectorID integer NOT NULL,
    GenreID integer NOT NULL,
    ImageURL varchar(300),
    Featured boolean,
    CONSTRAINT GenreKey FOREIGN KEY (GenreID)
        REFERENCES Genres(GenreID),
    CONSTRAINT DirectorKey FOREIGN KEY (DirectorID)
        REFERENCES Directors(DirectorID)
);

-- Create Users table
CREATE TABLE Users (
    UserID serial PRIMARY KEY,
    Username varchar(50) NOT NULL,
    Password varchar(50) NOT NULL,
    Email varchar(50) NOT NULL,
    Birth_date date
);

-- Create Users-Movies table
CREATE TABLE User_Movies (
    UserMovieID serial PRIMARY KEY,
    UserID integer,
    MovieID integer,
    CONSTRAINT UserKey FOREIGN KEY (UserID)
        REFERENCES Users(UserID),
    CONSTRAINT MovieKey FOREIGN KEY (MovieID)
        REFERENCES Movies(MovieID)
);
-- Insert Genres
INSERT INTO Genres(Name, Description) VALUES
('Thriller', 'Suspenseful movies that keep you on edge.'),
('Comedy', 'Movies meant to make you laugh.'),
('Animated', 'Movies with animation, often for kids.');

-- Insert Directors
INSERT INTO Directors(Name, Bio, Birthyear) VALUES
('Christopher Nolan', 'Director known for complex, mind-bending films.', '1970-07-30'),
('Judd Apatow', 'Director and producer of comedy films.', '1967-12-06'),
('Hayao Miyazaki', 'Famous Japanese animator and director.', '1941-01-05');

-- Insert Movies
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES
('Inception', 'A thief who steals secrets through dreams.', 1, 1, 'inception.png', TRUE),
('The Dark Knight', 'Batman faces the Joker in Gotham.', 1, 1, 'dark_knight.png', TRUE),
('Funny People', 'Comedians facing life challenges.', 2, 2, 'funny_people.png', FALSE),
('Superbad', 'Teens trying to party before graduation.', 2, 2, 'superbad.png', FALSE),
('Spirited Away', 'A girl trapped in a magical world.', 3, 3, 'spirited_away.png', TRUE),
('My Neighbor Totoro', 'Two girls meet magical forest spirits.', 3, 3, 'totoro.png', FALSE),
('Interstellar', 'A team travels through space to save humanity.', 1, 1, 'interstellar.png', TRUE),
('Knocked Up', 'Unexpected pregnancy and comedy ensues.', 2, 2, 'knocked_up.png', FALSE),
('Castle in the Sky', 'Adventures in a floating city.', 3, 3, 'castle_sky.png', FALSE),
('Dunkirk', 'World War II evacuation story.', 1, 1, 'dunkirk.png', TRUE);

-- Insert Users
INSERT INTO Users(Username, Password, Email, Birth_date) VALUES
('alice', 'pass123', 'alice@example.com', '1990-02-01'),
('bob', 'pass456', 'bob@example.com', '1988-06-15'),
('carol', 'pass789', 'carol@example.com', '1995-09-20');

-- Insert Users-Movies (favorites)
INSERT INTO User_Movies(UserID, MovieID) VALUES
(1,1),
(1,3),
(2,2),
(2,4),
(3,5),
(3,6);
