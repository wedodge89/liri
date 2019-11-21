require("dotenv").config();
const keys = require("./keys.js")
let spotify = new spotify(keys.spotify)

const operator = process.argv[2]

if (process.argv[2] = "spotify-this") {
    const song = process.argv[3]
    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}