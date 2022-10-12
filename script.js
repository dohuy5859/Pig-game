'use strict';


// STarter
const score0El = document.getElementById('score--0').textContent = 0;
const score1El = document.getElementById('score--1').textContent = 0;
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


let scores, activeplayer, currscore, playing;
const init = function () {
    scores = [0, 0];
    activeplayer = 0;
    currscore = 0;
    playing = true;
    /*these four variables here are declared inside of this init function
    therefore they are not accessble outside of the function we can say that they are "SCOPED" to the init function*/

    document.getElementById(`current--${activeplayer}`).textContent = 0;
    document.getElementById(`score--${activeplayer}`).textContent = 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
    document.getElementById(`current--${activeplayer}`).textContent = 0;
    currscore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}



//Rolling Dice
btnRoll.addEventListener('click', function () {
    if (playing) {
        // this code is saying if the game is still in play. Executes these code down here when the roll button is clicked.

        //1. generate random dice roll
        let diceNum = Math.floor(Math.random() * 6) + 1;// 0 - 5 add one to elavate to 6.
        //2. display the dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceNum}.png`;
        //3. check if it's 1. If true go to next player
        if (diceNum === 1) {
            //swith to next player
            switchPlayer();
        } else {
            //add the dice to current score
            currscore += diceNum;
            document.getElementById(`current--${activeplayer}`).textContent = currscore;
            //curr0El.textContent = currscore;
        }
    }
});
btnHold.addEventListener('click', function () {
    // 1. Add current score to active player's score
    if (playing) {
        scores[activeplayer] += currscore;
        //basically scores[1] = scores[1] + currscore;
        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];
        // 2. Check if player's score is >= 100
        if (scores[activeplayer] >= 100) {
            playing = false;
            //Finish the game
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');
            //hide the dice when the game is won.

        } else {
            switchPlayer();
        }

        //3. switch to the next player.
    }
})

btnNew.addEventListener('click', init);


// document.querySelector('.btn--roll').addEventListener('click', function () {
//     let diceNum = Math.floor(Math.random() * 6);
//     for (let i = 1; i < diceNum.length; i++) {

//     }

// }
// )
