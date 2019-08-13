const mongoose = require('mongoose')
const { Schema } = mongoose

const CardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    value: Object,
    price: {
        type: Object,
        default: {}
    },
    cardColor: Number,
    numberPlayer: Array
})


const cardColor = {
    "Brown": 1,
    "Grey": 2,
    "Blue": 3,
    "Yellow": 4,
    "Red": 5,
    "Green": 6,
    "Purple": 7
}

const cardRessource = {
    "Clay": 1,
    "Wood": 2,
    "Stones": 3,
    "Ore": 4,
    "Glass": 5,
    "Fabric": 6,
    "Papyrus": 7,
    "Gold": 8

}

module.exports = mongoose.model("Card", CardSchema)