const NUM_BUSHES = 50
const NUM_BALLS = 5

const player = document.querySelector('.player')
const player_pos = {
    x: parseInt(window.innerWidth / 2),
    y: parseInt(window.innerHeight / 2)
}
const player_vel = {
    x: 0,
    y: 0
}
const balls = []
const sound = new Audio('assets/coin.mp3')

function createBushes(){
    for(let i = 0; i < NUM_BUSHES; i++){
        const div = document.createElement('div')
        div.classList.add('bush')
        div.style.left = Math.random() * 100 + '%'
        div.style.top = Math.random() * 100 + '%'
        document.body.appendChild(div)
    }
}

function generateBall(){
    const div = document.createElement('div')
    div.classList.add('pokeball')
    let x = Math.random() * 100 + '%'
    let y = Math.random() * 100 + '%'
    div.style.left = x
    div.style.top = y
    balls.push({
        ball: div,
        pos: {
            x,
            y
        }
    })
    document.body.appendChild(div)
}

function createBalls(){
    for(let i = 0; i < NUM_BALLS; i++){
        generateBall()
    }
}

function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

let score = 0;
let currlevel = 1;
let maxlevels = 10;
// let timeLimit = 60;
// let timeRemaining = timeLimit;
let timer = 60;
let levelCleared = false;


function checkCollisions(){
    balls.forEach(ball => {
        if(collision(ball.ball, player)){
            sound.play()
            ball.ball.remove()
            generateBall()
            score++;
            document.getElementById("score").textContent = `Score : ${score}`;
        }
    })
}

// function startTimer(level){
//     let timeLimit = 60 - (level-1) * 5;
//     if(timeLimit < 0)    timeLimit = 0;
//     document.getElementById('timer')
// .innerHTML = 'Time: ' +timeLimit + 's';

//     clearInterval(intervalId);

//     intervalId = setInterval(updateTimer, 1000);
// }

function updateTimer() {
    if(timer > 0){
        timer -= 1;
        document.getElementById("timer").innerHTML = 'Time: ' + timer + 's';
    }
    else {
        document.getElementById("timer").innerHTML = 'Time: 0s';
        clearInterval(intervalId);
        showAlertBox();
    }
   
}

function showAlertBox(){
    document.querySelector('.alert-box').style.display = 'block';
}
let intervalId = setInterval(updateTimer, 1000);

let button = document.querySelector('#play-again-btn');

button.addEventListener('click', playAgain);

function playAgain() {

    location.reload();

    // console.log("Play Again button clicked");
}



// function incrementLevel(){
//     level++;
//     timeLimit -= 5;
//     if(timeLimit < 10){
//         timeLimit = 10;
//     }
//     timeRemaining = timeLimit;
//     document.getElementById("level").textContent = `Level : ${level}`;
// }

// function nextLevel(){
//     if(currlevel < maxlevels){
//         currlevel++;
//         document.getElementById('level').innerHTML = 'Level: ' + currlevel;
//         startTimer(currlevel);
//         document.querySelector('.alert-box').style.display = 'none';
//     }
//     else{
//         alert("Congratulations! You've completed all levels!")
//     }
// }

// document.getElementById('next-level-btn').addEventListener('click', nextLevel);
// document.getElementById('cancel-btn').addEventListener('click', function() {
//     document.querySelector('.alert-box').style.display = 'none'; // Hide alert box
// });

// startTimer(currentLevel);

function run(){
    player_pos.x += player_vel.x
    player_pos.y += player_vel.y

    player.style.left = player_pos.x + 'px'
    player.style.bottom = player_pos.y + 'px'
    
    checkCollisions();

    if(levelCleared){
        incrementLevel();
        levelCleared = false;
    }

    requestAnimationFrame(run)
}

function init(){
    createBushes()
    createBalls()
    run();
    setInterval(updateTimer, 1000)   //update timer every second
}

init()

window.addEventListener('keydown', function(e){
    if(e.key == "ArrowUp"){
        player_vel.y = 3
        player.style.backgroundImage = 'url("assets/player_front.png")'
    }
    if(e.key == "ArrowDown"){
        player_vel.y = -3
        player.style.backgroundImage = 'url("assets/player_back.png")'
    }
    if(e.key == "ArrowLeft"){
        player_vel.x = -3
        player.style.backgroundImage = 'url("assets/player_left.png")'
    }
    if(e.key == "ArrowRight"){
        player_vel.x = 3
        player.style.backgroundImage = 'url("assets/player_right.png")'
    }
    player.classList.add('active')
})
window.addEventListener('keyup', function(){
    player_vel.x = 0
    player_vel.y = 0
    player.classList.remove('active')
})