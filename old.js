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
            let info = {
                Venue: response.data[0].venue.name,
                Location: response.data[0].venue.city + ", " + response.data[0].venue.region,
                'Date': moment(response.data[0].datetime).format('L')
            }
            displayInfo(info);
        });
}

function song(str) {
    if (!str) { str = 'Cocaine Jesus' }

    spotify.search({ type: 'track', query: str }, (error, data) => {
        if (error) throw error;

        let info = {
            Artist: data.tracks.items[0].artists[0].name,
            Song: data.tracks.items[0].name,
            'Preview Link': data.tracks.items[0].preview_url,
            Album: data.tracks.items[0].album.name
        }
        displayInfo(info);
    });
}

function movie(str) {
    let title = str.replace(" ", "_");
    axios
        .get("https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy")
        .then(function (data) {

            let info = {
            Title: data.data.Title,
            'Release Year': data.data.Year,
            'IMDB Rating': data.data.Ratings[0].Value,
            'Rot Tom Rating': data.data.Ratings[1].Value,
            'Country Produced': data.data.Country,
            Language: data.data.Language,
            Plot: data.data.Plot,
            Actors: data.data.Actors
            }
            displayInfo(info);
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

function displayInfo(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        console.log(keys[i] + ': ' + obj[keys[i]]);
    }
}