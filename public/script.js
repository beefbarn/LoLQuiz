const button1 = document.getElementById("the-button-1");
const button2 = document.getElementById("the-button-2");
const button3 = document.getElementById("the-button-3");
const button4 = document.getElementById("the-button-4");
const questionText = document.getElementById("the-question");
const questionNum = document.getElementById("q-number");

// Set up trackers for scores
let questionTracker = 0;
let topLane = 0;
let jg = 0;
let mid = 0;
let bot = 0;
let supp = 0;
const lanes = ['Top Lane', 'Jungle', 'Mid Lane', 'ADC', 'Support'];

// Updates scores based on response selected
const scoreboard = (buttonName) => {
    if (buttonName === 'creepscore') {
        topLane++;
        bot++;
    } else if (buttonName === 'kda') {
        mid++;
        bot++;
    } else if (buttonName === 'objectives') {
        topLane++;
        supp++;
        jg++;
    } else if (buttonName === 'chilling') {
        topLane++;
        supp++;
    } else if (buttonName === 'mage') {
        mid++;
        supp++;
    } else if (buttonName === 'fighter') {
        topLane++;
        jg++;
    } else if (buttonName === 'tank') {
        topLane++;
        jg++;
        supp++;
    } else if (buttonName === 'carry') {
        mid++;
        bot++;
    } else if (buttonName === 'dontneedem') {
        topLane++;
        bot++;
    } else if (buttonName === 'ifmyteamfollowsme,wewin') {
        bot++;
        jg++;
    } else if (buttonName === 'ienjoyadaptingtomyteam') {
        supp++;
        mid++;
    } else if (buttonName === 'idomorethanmyteamrealizes') {
        supp++;
        jg++;
        topLane++;
    } else if (buttonName === 'mechanicallyskilled') {
        mid++;
        bot++;
    } else if (buttonName === 'rarelydies') {
        jg++;
        bot++;
    } else if (buttonName === 'mapcontrol') {
        jg++;
        supp++;
        topLane++;
    } else if (buttonName === 'lanecrushing') {
        topLane++;
        supp++;
    } else if (buttonName === 'whimsical') {
        supp++;
        mid++;
    } else if (buttonName === 'monstrous') {
        topLane++;
        jg++;
    } else if (buttonName === 'edgy') {
        jg++;
        bot++;
    } else if (buttonName === 'goofy') {
        mid++;
        supp++;
    } else {
        alert('ERROR');
    }
}

// List of questions and responses on each button
const questionStrings = [null, 'What Class of Champions Do You Enjoy?', 'How Do You Usually Feel About Teammates?', `What's Your Greatest Strength?`, `What Type of Champion Design Do You Find Most Appealing?`];
const buttonStrings1 = [null, 'Mage', `Don't Need 'Em`, `Mechanically Skilled`, `Whimsical`];
const buttonStrings2 = [null, 'Fighter', `If My Team Follows Me, We Win`, `Rarely Dies`, `Monstrous`];
const buttonStrings3 = [null, 'Tank', 'I Enjoy Adapting to My Team', `Map Control`, `Edgy`];
const buttonStrings4 = [null, 'Carry', `I Do More Than My Team Realizes`, `Lane Crushing`, `Goofy`];

// When a button is pressed, moves to the next question and updates questions and responses. If it is the last iteration, it will tally the scores and report a rec
const nextQuestion = (qNum) => {
    if (qNum === 2) {
        button1.classList.add('bigger-box')
        button2.classList.add('bigger-box')
        button3.classList.add('bigger-box')
        button4.classList.add('bigger-box')
    } else if (qNum === 3) {
        button1.classList.remove('bigger-box')
        button2.classList.remove('bigger-box')
        button3.classList.remove('bigger-box')
        button4.classList.remove('bigger-box')
    } else if (qNum === 5) {
        //delete all elements except h1 and then write the rec in h2
        let resultArray = [topLane, jg, mid, bot, supp];
        console.log('Array is ' + resultArray);
        const winnerVal = Math.max(...resultArray);
        console.log('Winner is ' + winnerVal);
        const finalRecs = [];
        let winNo = 0;
        for (let i = 0; i < 5; i++) {
            if (resultArray[i] === winnerVal) {
                winNo++
                if (winNo === 1) {
                    finalRecs.push(lanes[i]);
                } else {
                    finalRecs.push(` or ${lanes[i]}`);
                }
            }
            if (i === 4) {
                finalRecs.push('!')
            }
            console.log('Recs is ' + finalRecs);
        }
        let theResponse = `You Should Play `
        for (let i = 0; i < finalRecs.length; i++) {
            theResponse += finalRecs[i];
            console.log('Updated Resp is ' + theResponse)
        }
        // Updates the text content of h2 to display the rec
        questionNum.textContent = theResponse;
        console.log('Response is ' + theResponse);
        

    }
    button1.value = buttonStrings1[qNum];
    button2.value = buttonStrings2[qNum];
    button3.value = buttonStrings3[qNum];
    button4.value = buttonStrings4[qNum];
    questionText.textContent = questionStrings[qNum];
    // Updates the question number
    if (qNum < 5){
        questionNum.childNodes[0].nodeValue = `Question ${qNum + 1}`;
    }
}

const compress = (theValue) => {
    spaceless = theValue.toLowerCase().replaceAll(/\s/g, '').replaceAll(/'/g, '');
    console.log(theValue);
    console.log(spaceless);
    scoreboard(spaceless);
    questionTracker++;
    nextQuestion(questionTracker);
}


button1.addEventListener('click', () => compress(button1.value));
button2.addEventListener('click', () => compress(button2.value));
button3.addEventListener('click', () => compress(button3.value));
button4.addEventListener('click', () => compress(button4.value));


const searchButton = document.getElementById("search-button");
searchButton.addEventListener('click', () => getSummonerData(
    document.getElementById("game-name").value,
    document.getElementById("tag-line").value
))

// Takes the game name and tagline (entered on website by user) and starts to gather info.
async function getSummonerData(gameName, tagLine) {
    try {
        // First, fetch the data from the name and tagline provided:
        const response = await fetch(`/summoner/${gameName}/${tagLine}`);
        const data = await response.json();
        // Then, get more navigation info from puuid that was returned:
        const newInfoOut = await puuidFunction(data.puuid);
        // Then, get ranked stats to display on website:
        const rankedStatsOut = await statsFunction(newInfoOut.id);

        // Now, it is time to display the info:
        const rankDisplay = document.getElementById("rank-display");
        if (rankedStatsOut.length > 0) {
            rankDisplay.textContent = `Hello ${gameName}, You Are Currently Ranked: ${rankedStatsOut[0].tier} ${rankedStatsOut[0].rank}`;
        } else {
            rankDisplay.textContent = `Hello ${gameName}, You Are Currently Unranked`;
        }

    } catch (error) {
        console.error('Error fetching summoner data:', error);
    }

}

// This HELPER function takes a puuid in and outputs new info, including account id and id. Useful for future navigation
async function puuidFunction(puuidNum) {
    try {
        // Gets more info, now using the puuid to lookup the account
        const puuidResponse = await fetch(`/puuid/${puuidNum}`);
        const newInfo = await puuidResponse.json();
        console.log("New Info: ", newInfo);
        return newInfo;
    } catch (error) {
        console.error('Error Fetching PUUID Request:', error);
    }
}

// This HELPER function takes an id and looks up ranked stats on a player
async function statsFunction(idNum) {
    try {
        // Gets more info, now using the id to lookup the player stats
        const idResponse = await fetch(`/stats/${idNum}`);
        const rankedStats = await idResponse.json();
        console.log("Ranked Stats: ", rankedStats);
        return rankedStats
    } catch (error) {
        console.error('Error Fetching Stats Request:', error);
    }
}

