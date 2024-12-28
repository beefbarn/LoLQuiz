const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();  // Loads .env variables into `process.env`
console.log(process.env.RIOT_API_KEY);

const app = express();
const port = process.env.PORT || 3000;  // Set port to 3000 or from environment variable

// Replace with your actual Riot API key from the Riot Developer Portal
const API_KEY = process.env.RIOT_API_KEY;

// Summoner's name endpoint
const baseURL = 'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/';
const puuidBaseURL = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/';
const rankedBaseURL = 'https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/';

// Endpoint to fetch summoner data
app.get('/summoner/:gameName/:tagLine', async (req, res) => {
    const gameName = req.params.gameName;
    const tagLine = req.params.tagLine;

    try {
        const url = `${baseURL}${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}?api_key=${API_KEY}`;
        console.log(url);
        const response = await axios.get(url);
        res.json(response.data);  // Send the summoner data back to the client
    } catch (error) {
        console.error('Error fetching summoner data:', error);
        res.status(500).send('Error fetching summoner data');
    }
});

// Endpoint to fetch new info using PUUID
app.get('/puuid/:puuidNum', async (req, res) => {
    const puuid = req.params.puuidNum;

    try {
        const url = `${puuidBaseURL}${encodeURIComponent(puuid)}?api_key=${API_KEY}`;
        console.log(url);
        const response = await axios.get(url);
        res.json(response.data);  // Send the summoner data back to the client
    } catch (error) {
        console.error('Error fetching New Info:', error);
        res.status(500).send('Error fetching New Info.');
    }
});

// Endpoint to fetch ranked stats
app.get('/stats/:idNum', async (req, res) => {
    const id = req.params.idNum;

    try {
        const url = `${rankedBaseURL}${encodeURIComponent(id)}?api_key=${API_KEY}`;
        console.log(url);
        const response = await axios.get(url);
        res.json(response.data);  // Send the summoner data back to the client
    } catch (error) {
        console.error('Error fetching Stats:', error);
        res.status(500).send('Error fetching Stats.');
    }
});


// Serve static files (your website)
app.use(express.static('public'));

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
