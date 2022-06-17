const express = require("express");
const fetch = require("cross-fetch");
const path = require('path');
require("dotenv").config();

const app = express();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.whereby.dev/v1";

const data = {
  endDate: "2099-02-18T14:23:00.000Z",
};

function createRoom() {
    return fetch(`${BASE_URL}/meetings`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

app.post("/create-room", (request, response) => {
    createRoom().then(async res => {
        if(res.status >= 400) response.json("Something is wrong.")
        const data = await res.json();
        console.log("Room URL:", data.roomUrl);
        response.json(data.roomUrl);
    }); 
});

app.use(express.static('client'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/index.html'));
  });


app.listen(3000, () => console.log("Server started at port 3000!"));
