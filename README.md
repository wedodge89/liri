# liri

Upon being run in the terminal, the app starts by showing the user an Inquirer prompt with three choices. They can choose from searching for a song, movie, or concert. 


## Song
If "Song" is selected, then the user is asked for a song title and the desired number of results to display. Once these questions are answered, the app queries the Spotify API and prints relevant results to the screen, along with artist and album names, and a preview link, if available.. 

## Movie
If  "Movie" is selected, the user is asked for a movie title to search. The app then takes that title and uses Axios to query the OMDb API. It prints the top  search return, along with relevant information, including year of release, main cast, and a short plot summary.

## Concert
If the user selected "Concert," they are asked for the name of an artist or band. The app then uses Axios to find upcoming concerts for that artist listed on BandsInTown. It prints the results, including a date and time formatted using moment.js for easier readability. 

## Random
Finally, if the user selects "Surprise Me!" the app will read the "random.txt" file in the directory and print the result to the screen. 