
const inputfield = document.querySelector("input[type=text]");



function listen() {
    inputfield.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            let inputString = this.value;

            if (inputString === "")
                return;

            addNote(inputString);
            addToSession(inputString);

            inputfield.value = "";
        }
    });
}


function addNote(inputStr) {
    let container = document.getElementsByClassName("notes-container")[0];

    let noteElement = document.createElement("div");
    noteElement.className = "note";

    let msgElem = document.createElement("p");
    msgElem.innerHTML = inputStr;

    let btn = document.createElement("button");
    btn.innerHTML = "X";
    btn.setAttribute("onclick", "deleteNote(this)");

    noteElement.appendChild(msgElem);
    noteElement.appendChild(btn);

    container.appendChild(noteElement);
}

function deleteNote(obj) {
 
    let parent = obj.parentElement;

    removeFromSession(parent.children[0].innerHTML);

    parent.style.opacity = "0";
 
    setTimeout(() => {
        parent.remove();
    }, 200);
}



//Dealing with the current session data array
let curSessionData = [];

//Retriving tasks data from localStorage
if(JSON.parse(window.localStorage.getItem("tasks")) != null) {
    curSessionData = JSON.parse(window.localStorage.getItem("tasks"));
}

//Updating ui with cached data
for(let i=0; i<curSessionData.length; i++) {
    addNote(curSessionData[i]);
}

function removeFromSession(str) {
    const index = curSessionData.indexOf(str);
    if(index > -1) {
        curSessionData.splice(index, 1);
    }
    window.localStorage.setItem("tasks", JSON.stringify(curSessionData));
}
function addToSession(str) {
    curSessionData.push(str);
    window.localStorage.setItem("tasks", JSON.stringify(curSessionData));
}