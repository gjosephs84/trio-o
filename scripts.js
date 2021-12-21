// Get a handle on DOM elements
 let containerDiv = document.getElementById("game-board");
 let docBody = document.getElementById("body");
 const gamePieces = []; // An array to hold the moveable pieces

// The following generates the game board within a grid in the DOM
// Circles within the board itself are not moveable.
function makeBoard() {
     for (j=2; j < 5; j++) {
        for (i=2; i < 5; i++) {
            //Create the Large Circles
            let large = document.createElement('div')
                large.className = "large tan"
                large.style.gridColumnStart = i;
                large.style.gridRowStart = j;
                large.style.marginLeft = "10px";
                large.style.marginTop = "10px";
            //Create the Medium Circles
            let medium = document.createElement('div')
                medium.className = "medium tan"
                medium.style.gridColumnStart = i;
                medium.style.gridRowStart = j;
                medium.style.marginLeft = "40px";
                medium.style.marginTop = "40px";
            //Create the Small Circles
            let small = document.createElement('div')
                small.className = "small tan"
                small.style.gridColumnStart = i;
                small.style.gridRowStart = j;
                small.style.marginLeft = "70px";
                small.style.marginTop = "70px";
            //Add Circles to the DOM
                containerDiv.appendChild(large);
                containerDiv.appendChild(medium);
                containerDiv.appendChild(small);
            }
        }
}


function horizontalPieces(color, row) {
    for (i=2; i < 5; i++) {
        //Create the Large Circles
        let large = document.createElement('div')
            large.className = "large " + color;
            large.id = "large-" + color + "-" + (i-1);
            large.style.top = ((row - 1) * 190) + 20 + "px";
            large.style.left = ((190 * i) - 170) + "px";
            gamePieces.push(large.id);
          
        //Create the Medium Circles
        let medium = document.createElement('div')
            medium.className = "medium " + color;
            medium.id = "medium-" + color + "-" + (i-1);
            medium.style.top = ((row - 1) * 190) + 50 + "px";
            medium.style.left = ((190 * i) - 140) + "px";
            gamePieces.push(medium.id);
           
        //Create the Small Circles
        let small = document.createElement('div')
            small.className = "small " + color;
            small.id = "small-" + color + "-" + (i-1);
            small.style.top = ((row - 1) * 190) + 80 + "px";
            small.style.left = ((190 * i) - 110) + "px";
            gamePieces.push(small.id);
          
        //Add Circles to the DOM
            docBody.appendChild(large);
            docBody.appendChild(medium);
            docBody.appendChild(small);
        }
}

function verticalPieces(color, column) {
    for (i=2; i < 5; i++) {
        //Create the Large Circles
        let large = document.createElement('div')
            large.className = "large " + color;
            large.id = "large-" + color + "-" + (i-1);
            large.style.top = (((i - 1)* 190) + 20) + "px";
            large.style.left = (((column - 1) * 190) + 20) + "px";
            gamePieces.push(large.id);
          
        //Create the Medium Circles
        let medium = document.createElement('div')
            medium.className = "medium " + color;
            medium.id = "medium-" + color + "-" + (i-1);
            medium.style.top = ((i - 1) * 190) + 50 + "px";
            medium.style.left = (((column - 1) * 190) + 50) + "px";
            gamePieces.push(medium.id);
           
        //Create the Small Circles
        let small = document.createElement('div')
            small.className = "small " + color;
            small.id = "small-" + color + "-" + (i-1);
            small.style.top = ((i - 1) * 190) + 80 + "px";
            small.style.left = (((column - 1) * 190) + 80) + "px";
            gamePieces.push(small.id);
          
        //Add Circles to the DOM
            docBody.appendChild(large);
            docBody.appendChild(medium);
            docBody.appendChild(small);
        }
}

// Generate the game board
makeBoard();

// Generate the game pieces
horizontalPieces("red", 1);
horizontalPieces("green", 5);
verticalPieces("blue", 1);
verticalPieces("purple", 5);

//Make the game pieces draggagle:

let totalPieces = gamePieces.length;
for (i=0; i < totalPieces; i++) {
    let pieceID = gamePieces[i];
    dragElement(document.getElementById(pieceID));
    }

function dragElement(elmnt) {
    
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    
    e.preventDefault();

    
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    
    
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
