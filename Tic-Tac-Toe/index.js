//first player turn by default
var turn = true;


//Get all the div elemetns for DOM and store it in an array
let boxArray = document.querySelectorAll("div");



boxArray.forEach(function (elem) {

    //for click event
    elem.addEventListener("click", function () {

        //Getting the current background color
        const temp = getComputedStyle(elem).backgroundColor;


        //Checking if the box has been marked before or not
        if (temp == "rgb(255, 255, 255)") {

            //Setting background-color according to player's turn
            if (turn)
                elem.style.backgroundColor = "red";
            else
                elem.style.backgroundColor = "black";

            //Changing the turn of player
            turn = !turn;

            //setting the cursor to normal since the box has been clicked
            elem.style.cursor = "inherit";
        } 


        //To check if any player has won
        if(winCheck()) {
            alert("won!");
            reset();
        } 

    });
});


//For resetting the board
document.querySelector("button").addEventListener('click', reset);

function reset() {
    //Inital turn to player one(red color)
    turn = true;

    //Loop to every box and set its property to reset state
    for (var i = 0; i < boxArray.length; i++) {
        var elem = boxArray[i];
        elem.style.backgroundColor = "rgb(255, 255, 255)";
        elem.style.cursor = "pointer";
    }
}


function winCheck() {

    //row-widse && diagonal check
    for(let i=1; i<=9; i+=3) {

        let prevColor = document.getElementById(i).style.backgroundColor;

        if(prevColor != "red" && prevColor != "black") 
            continue;
        
        let won = true;

        for(let j=i; j<i+3; j++) {

            let boxColor = document.getElementById(j).style.backgroundColor;
            
            if(prevColor != boxColor)  {
                won = false;
                break;
            }
        }

        if(won)
            return true;
    }

    //colomn-wise check
    for(let i=1; i<4; i++) {
        let prevColor = document.getElementById(i).style.backgroundColor;

        if(prevColor != "red" && prevColor != "black") 
            continue;
        
        let won = true;
        for(let j=i; j<=9; j+=3) {

            let boxColor = document.getElementById(j).style.backgroundColor;
            
            if(prevColor != boxColor)  {
                won = false;
                break;
            }
        }

        if(won)
            return true;
    }


    //Diagonal-check
    let prevColor = document.getElementById("1").style.backgroundColor;
    if((prevColor == "red" || prevColor == "black") && document.getElementById("5").style.backgroundColor == prevColor && document.getElementById("9").style.backgroundColor == prevColor) 
        return true;

    prevColor = document.getElementById("3").style.backgroundColor;
    if((prevColor == "red" || prevColor == "black") && document.getElementById("5").style.backgroundColor == prevColor && document.getElementById("7").style.backgroundColor == prevColor)
        return true;
    


    return false;
}
