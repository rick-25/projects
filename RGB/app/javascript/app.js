let element = null;
let xOffset = 0;


let mouseIsDown = false;
let clickedInside = false;

document.addEventListener("mousedown", function name(pointer) {
    mouseIsDown = true;

    if (mouseInside) {
        clickedInside = true;
        element.style.cursor = "pointer";

        let left = element.style.left;
        if (left === "")
            left = element.parentElement.children[1].offsetWidth + "px";

        left = left.substr(0, left.length - 2);

        xOffset = pointer.clientX - parseInt(left);

    } else {
        clickedInside = false;
    }


});
document.addEventListener("mouseup", function name(params) {
    mouseIsDown = false;
    element.style.cursor = "default";
});




let mouseInside = false;
document.querySelectorAll(".mover").forEach(item => {
    item.addEventListener("mouseover", function name(event) {
        mouseInside = true;
        element = event.target;
    });

    item.addEventListener("mouseleave", function name(params) {
        mouseInside = false;
    });
});



//real core work
document.addEventListener("mousemove", function (event) {
    if (mouseIsDown && clickedInside) {

        let left = event.clientX - xOffset;
        let max = element.parentElement.children[1].offsetWidth;

        //Claping the left value with limits
        left = Math.max(left, 0);
        left = Math.min(left, max);


        //updates the position of target element
        updatePosition(left);


        const colorValue = getColorValue(left, max);
        const index = element.parentElement.parentElement.id;
        const body = document.querySelector("body");

        //Updates the paragraph text
        updateText(colorValue);

        //Updates rgb value of body
        updateBgColor(body, index, colorValue);
    }
});





function updateText(colorValue) {
    let textP = element.parentElement.parentElement.children[1];
    textP.innerText = colorValue;
}

function updatePosition(left) {
    element.style.left = left + "px";
}

function updateBgColor(target, colorIndex, value) {

    rgb = window.getComputedStyle(target).backgroundColor;

    colorArray = rgb.match(/\d+/g);
    colorArray[colorIndex] = value;
    
    rgb = "rgb(";
    for(let i=0; i<colorArray.length; i++) {
        if(i > 0)
            rgb += ", ";
        rgb += colorArray[i];
    }
    rgb += ")";
    
    target.style.backgroundColor = rgb;
}

function getColorValue(dist, max) {
    let percentage = Math.trunc(dist / max * 100);
    let colorValue = Math.trunc(percentage * 255 / 100);
    return colorValue;
}

