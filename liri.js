require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const inquirer = require("inquirer");

// let spotify = new Spotify({spotify.keys})

inquirer 
  .prompt(
    {
    message: "What are you looking for?",
    type: "list",
    name: "api",
    choices: ["Song", "Movie", "Concert"]
  }
)
  .then(function(answer) {
    switch (answer.api) {
      case "Song":
        console.log("Spotify is working.");
        spotifyFunc();
        break;
      case "Movie":
        console.log("Searching for movies...")
        omdbFunc();
        break;
      case "Concert":
        console.log("Searching for concerts...")
        bandsFunc();
        break;
    }
  });

function spotifyFunc() {
  console.log("Activating Spotify search...")
  inquirer
    .prompt(
      {
      type: "input",
      message: "What is the song you're looking for?",
      name: "songQuery"
    }
    )
    .then(function(answer) {
      let query = answer.songQuery;
      if (query === "") {
        console.log("Please enter the name of a song.")
        spotifyFunc()
      } else {
        const spotify = new Spotify(keys.spotify)
        spotify.search ({type: "track", query: query, limit: 20})
          .then(function(data) {
            console.log("Here's what we found:")
            let songList = data.tracks.items
            for (i = 0; i < songList.length; i++){
              let song = songList[i]
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
                  --------------
                  Artist: ${song.artists[0].name}
                  Title: ${song.name}
                  Album: ${song.album.name}
                  Preview not available.`)
              }
            }
          }
          )}
    })
}