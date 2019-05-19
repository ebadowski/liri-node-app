var CHOOSE = require("./decide");
var choose = new CHOOSE();

//console.log('choose in the run file!!', choose);

let arr = process.argv;
arr.splice(0, 2);
let operator = arr[0];
arr.splice(0, 1);
let text = arr.join(" ")

choose.decide(operator, text);


