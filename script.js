const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

initGame();
const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//let's create a function to initialize the game
function initGame() {

    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //we have to empty the boxes on UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //initialze box with css properties again
        box.classList = `box box${index+1}`;

    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // change the turn
        swapTurn();
        //check if the game is over or not
        checkGameOver();
    }
}

boxes.forEach((box, index) => {

    box.addEventListener('click', () => {
        handleClick(index);
    })

});

function swapTurn() {

    if (currentPlayer === "X")
        currentPlayer = "O";
    else
        currentPlayer = "X";

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let winner="";
    winningPositions.forEach((position)=>{
        //all 3 boxes should be non-empty and should be same in value
        if( (gameGrid[position[0]]!=="" && gameGrid[position[1]]!=="" && gameGrid[position[2]]!=="")
             && gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]] ){

                if(gameGrid[position[0]]==="X")
                    winner="X";
                else
                    winner="O";

                //disable pointer events for every box 
                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                })

                //now we know X/O is winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner
    if(winner!==""){
        gameInfo.innerText=`Winner Player - ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }

    else{
        //let's check if there is tie
        let fillCount=0;
        gameGrid.forEach((box)=>{
            if(box!=="")
                fillCount++;
        });
        
        if(fillCount===9){
            gameInfo.innerText=`Game Tied!`;
            newGameBtn.classList.add("active");
        }
    }
    
    

}



newGameBtn.addEventListener('click', initGame);
