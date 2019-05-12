require("dotenv").config();
// require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
//var spotify = new Spotify(keys.spotify);
let arr = process.argv;
arr.splice(0, 2);
let operator = arr[0];
arr.splice(0, 1);
let str = arr.join(" ")


decide(operator);





function decide(oper) {
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
            external(str)
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
            // If the axios was successful...
            // Then log the body from the site!
            //;console.log(response.data);
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            let date = moment(response.data[0].datetime).format('L');
            console.log("Date: " + date);
        });
}
function song(str) {

}
function movie(str) {

}
function external(str) {
    //get string from txt file
    //let text = 
    //decide(text)
}