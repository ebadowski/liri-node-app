require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

let arr = process.argv;
arr.splice(0, 2);
let operator = arr[0];
arr.splice(0, 1);
let text = arr.join(" ")

decide(operator, text);

function decide(oper, str) {
    switch (oper) {
        case 'concert-this':
            concert(str)
            break;
        case 'spotify-this-song':
            song(str)
            break;
        case 'movie-this':
            movie(str)
            break;
        case 'do-what-it-says':
            external()
            break;
        default:
            console.log('Not a valid query');
    }
}

function concert(str) {
    let artist = str.replace(" ", "_");
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            let date = moment(response.data[0].datetime).format('L');
            console.log("Date: " + date);
        });
}
function song(str) {
    if (!str) { str = 'Cocaine Jesus' }

    spotify.search({ type: 'track', query: str }, (error, data) => {
        if (error) throw error;

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
    });
}
function movie(str) {
    let title = str.replace(" ", "_");
    axios
        .get("https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy")
        .then(function (data) {
            console.log("* " + data.data.Title); //Title
            console.log("* " + data.data.Year); //Release Year
            console.log("* " + data.data.Ratings[0].Value); //IMDB Rating
            console.log("* " + data.data.Ratings[1].Value); //Rot Tom Rating
            console.log("* " + data.data.Country); //Country Produced
            console.log("* " + data.data.Language); //Language
            console.log("* " + data.data.Plot); //Plot
            console.log("* " + data.data.Actors); //Actors
        });
}
function external() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) throw error;
        console.log(data);
        var dataArr = data.split(",");
        dataArr[1] = dataArr[1].replace(/"/g, '');
        console.log(dataArr);
        decide(dataArr[0], dataArr[1]);
    });
}