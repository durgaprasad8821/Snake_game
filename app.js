const playgroundBoard = document.querySelector(".playground");
const highScore = document.getElementById("high-score");
const score = document.getElementById("score");
let foodX = 13 , foodY = 4;
let snakeX = 10 , snakeY = 14;
let snakeBody = [];
let gameOver = false;
let velocityX = 0 , velocityY = 0;
let setIntervalId;
let mostScore = [];
const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const changePosition = (e) =>{
    console.log(e);
    if(e.key === 'ArrowDown'){
        velocityY = 1;
        velocityX = 0;
    }else if(e.key === 'ArrowUp'){
        velocityY = -1;
        velocityX = 0;
    }else if(e.key === 'ArrowRight'){
        velocityY = 0;
        velocityX = 1;
    }else if(e.key === 'ArrowLeft'){
        velocityY = 0;
        velocityX = -1;
    }

    init()
}

const gameOverInstruction = () =>{
    clearInterval(setIntervalId);
    mostScore[0] = snakeBody.length-1;
    try{
        if(JSON.parse(localStorage.getItem("score"))[0] < snakeBody.length-2){
            localStorage.setItem("score" , JSON.stringify(mostScore));
        }
    }catch(error){
        localStorage.setItem("score" , JSON.stringify(mostScore));
    }
   
    alert("Game Over.......");
    location.reload();
}
const init = () => {
    if(gameOver){
        gameOverInstruction()
    }
    snakeX += velocityY;
    snakeY  += velocityX;
    score.innerText = snakeBody.length-1
    console.log(snakeBody);
    if(snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30){
        gameOver = true;
    }
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX ,foodY]);
     }
    for(let i = snakeBody.length - 1 ; i >  0 ; i-- ){
            snakeBody[i] = snakeBody[i-1];
    }  

    snakeBody[0] = [snakeY , snakeX];
    let htmlMarkup = `<div class="food" style="grid-area:${foodX} / ${foodY} "></div>`;

    for(let i = 0 ; i < snakeBody.length ; i++){
         htmlMarkup += `<div class="snake" style="grid-area:${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
         if(i !== 0 && snakeBody[0][1] ===snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
         }
    }
   
    playgroundBoard.innerHTML = htmlMarkup;
}
changeFoodPosition() 

setIntervalId = setInterval(init , 100)

try{
    highScore.innerText = JSON.parse(localStorage.getItem("score"))[0];
}catch(error){
    console.log(error);
}


document.addEventListener('keydown' , changePosition);
