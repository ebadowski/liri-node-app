var LIRI = require("./liri");
var liri = new LIRI();

var CHOOSE = function () {
    this.decide = (oper, str) => {
        switch (oper) {
            case 'concert-this':
                liri.concert(str) //Haim //Zootopia
                break;
            case 'spotify-this-song': //Africa //notasong
                liri.song(str)
                break;
            case 'movie-this': //Zootopia //fakemovie
                liri.movie(str)
                break;
            case 'do-what-it-says':
                liri.external(CHOOSE)
                break;
            default:
                console.log('Not a valid query');
        }
    }
}

module.exports = CHOOSE;