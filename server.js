'ues strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT;
var mongoose = require("mongoose");



mongoose.connect('mongodb://localhost:27017/digimons',
    { useNewUrlParser: true, useUnifiedTopology: true });


var digimonsSchema = new mongoose.Schema({

    name: String,
    img: String,
    level: String
});



var Mymodeldigimons = mongoose.model("digimons", digimonsSchema);

server.get('/test', HandlerTest);
server.get('/digimons', getDigimonHandler);
// server.post('/addDigimons', addFavHandler);
// server.get('/favoritedigimons', getFavHandler)
// server.delete('/deleteDigimons/:index', deleteFavHandler);

function HandlerTest(req, res) {

    res.send("test Time")


}


function getDigimonHandler(req, res) {

    const digimon = req.query.digimon;
    const url = `https://digimon-api.vercel.app/api/digimon=${digimon}`;

    axios.get(url).than(result => {

        const digimonArray = result.data.map(digimon => {

            return (new Digimon(digimon));

        })


        res.send(digimonArray);

    })


}

class Digimon {

    constructor(data) {
        this.name = data.name;
        this.img = data.img;
        this.level = data.level;


    }


}




server.listen(PORT, () => {

    console.log(`listen from ${PORT}`);


});