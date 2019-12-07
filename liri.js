require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const inquirer = require("inquirer");
const moment = require("moment");
const fs = require("fs")

startUp()

function startUp() {
  inquirer 
  .prompt(
    {
    message: "What are you looking for?",
    type: "list",
    name: "api",
    choices: ["Song", "Movie", "Concert", "Surprise Me!"]
  }
)
  .then(function(answer) {
    switch (answer.api) {
      case "Song":
        spotifyFunc();
        break;
      case "Movie":
        omdbFunc();
        break;
      case "Concert":
        bandsFunc();
        break;
      case "Surprise Me!":
        randFunc();
        break;
    }
  })};

function spotifyFunc() {
  console.log("Activating Spotify search...")
  inquirer
    .prompt([
      {
      type: "input",
      message: "What is the song you're looking for?",
      name: "songQuery"
      },
      {type: "list",
      message: "How many results would you like (maximum)?",
      choices: [5, 10, 20],
      name: "songLimit"}
    ])
    .then(function(answer) {
      let query = answer.songQuery;
      if (query === "") {
        console.log("Please enter the name of a song.")
        spotifyFunc()
      } else {
        console.log("Working on your search now...")
        const spotify = new Spotify(keys.spotify)
        spotify.search ({type: "track", query: query, limit: answer.songLimit})
          .then(function(result) {
            console.log("Here's what we found:")
            let songList = result.tracks.items
            for (i = 0; i < songList.length; i++){
              let song = songList[i];
              if (song.preview_url !== null) {
                console.log(
                  `
                  -------------
                  Artist: ${song.artists[0].name}
                  Title: ${song.name}
                  Album: ${song.album.name}
                  Preview: ${song.preview_url}`)
              } else {
                console.log(`
                  -------------------
                  Artist: ${song.artists[0].name}
                  Title: ${song.name}
                  Album: ${song.album.name}
                  Preview not available.`)
              }
            }
          }
          )}
    })
};

function omdbFunc() {
  console.log("Activing OMDb search...")
  inquirer
    .prompt(
      {
        type: "input",
        message: "What movie are you looking for?",
        name: "movieQuery"
      }
      )
      .then(function(answer) {
        let query = answer.movieQuery;
        if (query === "") {
          console.log("Please enter the name of a movie.")
          omdbFunc()
        } else {
          const omdb = keys.omdb;
          axios
            .get("http://www.omdbapi.com/?apikey=trilogy&t=" + query)
            .then(function(result) {
              const movie = result.data;
              console.log(`
              ----------------
              Title: ${movie.Title}
              Year: ${movie.Year}
              IMDb Rating: ${movie.Ratings[0].Value}
              RT Rating: ${movie.Ratings[1].Value}
              Country: ${movie.Country}
              Language: ${movie.Language}
              Actors: ${movie.Actors}
              Plot: ${movie.Plot}
              `)
            })
        }
      })
};

function bandsFunc() {
  console.log("Activating Bands in Town Search...")
  inquirer
  .prompt(
    {
      type: "input",
      message: "What artist are you looking for?",
      name: "bandQuery"
    })
  .then(function(answer) {
    let query = answer.bandQuery;
    if (query === "") {
      console.log("Please enter the name of an artist.")
      bandsFunc()
    } else {
      console.log("Searching for concerts now...")
      axios
        .get("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp")
        .then(function(result) {
          let concert = result.data
          for (let i = 0; i < concert.length; i++) {
            if (concert[i].venue.region !== "") {
            console.log(`
            -----------------
            Venue: ${concert[i].venue.name}
            Venue Location: ${concert[i].venue.city}, ${concert[i].venue.region}
            Date/Time: ${moment(concert[i].datetime).format("MM/D/YYYY")}
          `
          )} else {
            console.log(`
            -----------------
            Venue: ${concert[i].venue.name}
            Venue Location: ${concert[i].venue.city}, ${concert[i].venue.country}
            Date/Time: ${concert[i].datetime}
          `)
          }
        }
        })
    }
  })
};

function randFunc() {
  console.log("Random choice, coming right up...")
  fs.readFile("./random.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    randData = data.split(",")
    console.log(randData)
    switch (randData[0]) {
      case "spotify":
        spotifyAPI();
        break;
      case "movie":
        movieAPI();
        break;
      case "concert":
        concertAPI();
        break;
    }
  }
  )};

function spotifyAPI() {
  console.log("It's Spotify time!")
  let query = randData[1];
  console.log(query)
  
}