const button1 = document.getElementById("the-button-1");
const button2 = document.getElementById("the-button-2");
const button3 = document.getElementById("the-button-3");
const button4 = document.getElementById("the-button-4");
const questionText = document.getElementById("the-question");
const questionNum = document.getElementById("q-number");

let questionTracker = 0;
let topLane = 0;
let jg = 0;
let mid = 0;
let bot = 0;
let supp = 0;
const lanes = ['Top Lane', 'Jungle', 'Mid Lane', 'ADC', 'Support'];

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

const questionStrings = [null, 'What Class of Champions Do You Enjoy?', 'How Do You Usually Feel About Teammates?', `What's Your Greatest Strength?`, `What Type of Champion Design Do You Find Most Appealing?`];
const buttonStrings1 = [null, 'Mage', `Don't Need 'Em`, `Mechanically Skilled`, `Whimsical`];
const buttonStrings2 = [null, 'Fighter', `If My Team Follows Me, We Win`, `Rarely Dies`, `Monstrous`];
const buttonStrings3 = [null, 'Tank', 'I Enjoy Adapting to My Team', `Map Control`, `Edgy`];
const buttonStrings4 = [null, 'Carry', `I Do More Than My Team Realizes`, `Lane Crushing`, `Goofy`];

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
                if (i === 4) {
                    finalRecs.push('!')
                }
            }
            console.log('Recs is ' + finalRecs);
        }
        let theResponse = `You Should Play `
        for (let i = 0; i < finalRecs.length; i++) {
            theResponse += finalRecs[i];
            console.log('Updated Resp is ' + theResponse)
        }
        questionNum.textContent = theResponse;
        console.log('Response is ' + theResponse);
        

    }
    button1.value = buttonStrings1[qNum];
    button2.value = buttonStrings2[qNum];
    button3.value = buttonStrings3[qNum];
    button4.value = buttonStrings4[qNum];
    questionText.textContent = questionStrings[qNum];
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