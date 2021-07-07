'use strict';

document.getElementById('rulesBtn').addEventListener('click', function(){
    document.getElementById('rules').classList.add('hidden');
    document.getElementById('video').src += "&autoplay=1";
})


const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const winner = document.querySelector('.player--winner');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


scorePlayer1.textContent = 0;   
scorePlayer2.textContent = 0;
dice.classList.add('hidden');

var player1CurrentScore=0;
var player2CurrentScore=0;
var currentPlayer=0;

var winnerFlag=0;

const checkWinner = function(){
    if(scorePlayer1.textContent >= 100)
        document.querySelector('.player--0').classList.add('player--winner');
    else if( scorePlayer2.textContent >= 100)
        document.querySelector('.player--1').classList.add('player--winner');

}

const activePlayer = function(){
    if(currentPlayer == 0){
        document.querySelector('.player--1').classList.remove('player--active');
        document.querySelector('.player--0').classList.add('player--active');
    }
    else{
        document.querySelector('.player--0').classList.remove('player--active');
        document.querySelector('.player--1').classList.add('player--active');
    }
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
} 

btnRoll.addEventListener('click', function(){
    const diceValue =  Math.trunc(Math.random()* 6) + 1;

    dice.classList.remove('hidden');
    if(winnerFlag != 1){
        dice.src= `dice-${diceValue}.png`;
        if(diceValue != 1 && diceValue != 6){
            if(currentPlayer == 0){
                player1CurrentScore+=diceValue;
                current0.textContent = player1CurrentScore;
            }
            else{
                player2CurrentScore+=diceValue;
                current1.textContent = player2CurrentScore;
            }
        }
        else{
            if(currentPlayer == 0){
                player1CurrentScore = 0;
                current0.textContent = player1CurrentScore;
                currentPlayer = 1;
                activePlayer();
            }
            else{
                player2CurrentScore = 0;
                current1.textContent = player2CurrentScore;
                currentPlayer = 0;
                activePlayer();
            }
        }
    }
    else
        return;
})

//  game reset..
// btnNew.addEventListener('click', function(){
//     currentPlayer = 0;
//     player1CurrentScore=0;
//     player2CurrentScore=0;
//     current0.textContent = 0;
//     current1.textContent = 0;
//     scorePlayer1.textContent = 0;
//     scorePlayer2.textContent = 0;
//     activePlayer();
//     winnerFlag = 0;
//     dice.classList.add('hidden');
// })


//  save game..

btnHold.addEventListener('click', function(){    
        if(currentPlayer == 0){
            if((Number(scorePlayer1.textContent) + player1CurrentScore <= 100 )){
                scorePlayer1.textContent = Number(scorePlayer1.textContent)+ player1CurrentScore;
                player1CurrentScore = 0;
                current0.textContent = player1CurrentScore;
                currentPlayer = 1;
                activePlayer();
            }
            else{
                scorePlayer1.textContent = 100;
                winnerFlag=1;
                checkWinner();
            }    
                
        }
        else{
            if(Number(scorePlayer2.textContent) + player2CurrentScore <= 100 ){
                scorePlayer2.textContent =  Number(scorePlayer2.textContent) + player2CurrentScore;
                player2CurrentScore = 0;
                current1.textContent = player2CurrentScore;
                currentPlayer = 0;
                activePlayer();
            }
            else{
                scorePlayer2.textContent = 100;
                winnerFlag=1;
                checkWinner();
            }
        }
})