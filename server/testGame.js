const Player = require('./models/player')
const WonderRoute = require("./routes/wonders")
let axios = require ("axios")
const apiUrl = "http://localhost:3000"

axios.get(apiUrl + '/wonders')
.then(response => {
    console.log(response.data)
})
.catch(err => {
    console.log(err)
})

// let player1 = {
//     name: "Player1",

// }