// Get a handle on DOM elements
 let containerDiv = document.getElementById("game-board");
 let docBody = document.getElementById("body");
 const largeBoardPieces = []; // Array to hold BoundingClientRecs of board pieces
 const mediumBoardPieces = []; // Array to hold BoundingClientRecs of board pieces
 const smallBoardPieces = []; // Array to hold BoundingClientRecs of board pieces
 const boardPieceDivs = []; // Array to hold the board piece Divs
 const gamePieces = []; // An array to hold the IDs of the moveable pieces
 const gamePieceDivs = [] // An array to hold the moveable game piece Divs
 const placedPieces = []; // Am array to hold a record of placed pieces

/* 
The following function creates objects for the tan piecs to keep track of their
x and y coordinates, as well as their grid locations. It is used within the makeBoard()
function to push these objects into the large, medium, and small board pieces arrays.
*/

 function boardObject(boardCircle, row, column) {
    let boardPiece = {
        x: boardCircle.getBoundingClientRect().x,
        y: boardCircle.getBoundingClientRect().y,
        row: row,
        column: column
    };
    return boardPiece;
}

// The following generates the game board within a grid in the DOM
// Circles within the board itself are not moveable.
function makeBoard() {
     for (j=2; j < 5; j++) {
        for (i=2; i < 5; i++) {
            // A function to generate the circles
            const makeCircles = (size, j, i, offset, sizeLetter, piecesArray) => {
                let newCircle = document.createElement('div');
                newCircle.className = `${size} tan`;
                newCircle.id = `${size} ${j} ${i}`;
                newCircle.style = `grid-column-start: ${i}; grid-row-start: ${j}; margin-left: ${offset}px; margin-top: ${offset}px;`;
                // Add the circle to the DOM
                containerDiv.appendChild(newCircle);
                // Add the circle to the proper BoardPieces array
                piecesArray.push(boardObject(newCircle, j, i));
                boardPieceDivs.push(newCircle);
                let piece = {
                    color: "",
                    size: sizeLetter,
                    row: j,
                    column: i,
                    id: ""
                };
                placedPieces.push(piece);
            };
            makeCircles("large", j, i, 10, "l", largeBoardPieces);
            makeCircles("medium", j, i, 40, "m", mediumBoardPieces);
            makeCircles("small", j, i, 70, "s", smallBoardPieces);
            }
        }
}

function horizontalPieces(color, row) {
    for (i=2; i < 5; i++) {
        // A function to create the horizontal circles
        const createHorizontal = (size, i, color, row, topMarginOffset, leftMarginOffset) => {
            let newPiece = document.createElement('div');
            newPiece.className = `${size} ${color}`;
            newPiece.id = `${size}-${color}-${i-1}`;
            let topOffset = ((row - 1) * 190) + topMarginOffset;
            let leftOffset = ((190 * i) - leftMarginOffset);
            newPiece.style.top = `${topOffset}px`;
            newPiece.style.left = `${leftOffset}px`;
            gamePieces.push(newPiece.id);
            gamePieceDivs.push(newPiece); 
            docBody.appendChild(newPiece);
        };
        createHorizontal("large", i, color, row, 20, 170);
        createHorizontal("medium", i, color, row, 50, 140);
        createHorizontal("small", i, color, row, 80, 110);
        }
}

function verticalPieces(color, column) {
    for (i=2; i < 5; i++) {
        // A function to create the vertical pieces
        const createVertical = (size, i, color, column, topMarginOffset, leftMarginOffset) => {
            let newPiece = document.createElement('div');
            newPiece.className = `${size} ${color}`;
            newPiece.id = `${size}-${color}-${i-1}`;
            let topOffset = ((i - 1) * 190) + topMarginOffset;
            let leftOffset = ((column - 1) * 190) + leftMarginOffset;
            newPiece.style.top = `${topOffset}px`;
            newPiece.style.left = `${leftOffset}px`;
            gamePieces.push(newPiece.id);
            gamePieceDivs.push(newPiece); 
            docBody.appendChild(newPiece);
        };
        createVertical("large", i, color, column, 20, 20);
        createVertical("medium", i, color, column, 50, 50);
        createVertical("small", i, color, column, 80, 80);
        }
}

// Generate the game board
makeBoard();

// Generate the game pieces
horizontalPieces("red", 1);
horizontalPieces("green", 5);
verticalPieces("blue", 1);
verticalPieces("purple", 5);

// A function to mark the piece locations

function markPieceLocation(piece, theRow, theColumn, size) {
    let divId = piece.id;
    let classArray = piece.className.split(" ");
    let color = classArray[1];
    for (a = 0; a < placedPieces.length; a++) {
        if (placedPieces[a].row == theRow && placedPieces[a].column == theColumn) {
            if (size == placedPieces[a].size) {
                placedPieces[a].color = color;
                placedPieces[a].id = divId;
            }
        }
        }
    }




//Make the game pieces draggagle:

let totalPieces = gamePieces.length;
for (i=0; i < totalPieces; i++) {
    let pieceID = gamePieces[i];
    dragElement(document.getElementById(pieceID));
    }

function dragElement(elmnt) {
    
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    //elmnt.ontouchstart = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    
    e.preventDefault();

    
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  };

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
    elmnt.style.zIndex="100";
  };

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    let circleSize = elmnt.className[0]; //Figure out size of circle moved
    let circleX = elmnt.style.left.slice(0, -2); //Get its X coordinate
    let circleY = elmnt.style.top.slice(0, -2); //Get its Y coordinate
    elmnt.style.zIndex="0";
    
    // Compare circle coordinates with gameboard circles and snap in place
    
    let boardPieces
    
    if (circleSize == "l") {
        boardPieces = largeBoardPieces;
    }
    if (circleSize == "m") {
        boardPieces = mediumBoardPieces;
    }
    if (circleSize == "s") {
        boardPieces = smallBoardPieces;
    }

    for (i = 0; i < 9; i++) {
        // Set a range within which to snap pieces along X coordinates
        let lowerXRange = boardPieces[i].x - 50;
        let upperXRange = boardPieces[i].x + 50;

        // Check to see if X coordinates are within snapping range
        if (circleX > lowerXRange && circleX < upperXRange) {
            for (j = 0; j < 9; j++) {

                // Set a range within to snap pieces along Y coordinates
                let lowerYRange = boardPieces[j].y - 40;
                let upperYRange = boardPieces[j].y + 40;

                // Check to see if Y coordinates are within snapping range
                if (circleY > lowerYRange && circleY < upperYRange) {

                    // If yes, snap X and Y coordinates to game board
                    let k = boardPieces[j].row;
                    let l = boardPieces[i].column;
                    elmnt.style.left = boardPieces[i].x + "px";
                    elmnt.style.top = boardPieces[j].y + "px";
                    markPieceLocation(elmnt, k, l, circleSize);
                }
            }
        } 
        
    }

    const isThereAWinner = checkWinner();
    if (isThereAWinner != false) {
        greyOut(isThereAWinner);
    };
    
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

// A function to get piece size
const getSize = (piece) => {
    let theSize;
    switch (piece.size) {
        case 'l' : theSize = 3;
            break;
            case 'm' : theSize = 2;
            break;
            case 's' : theSize = 1;
            break;
            default : theSize = 0;
    }
    return theSize;
};

// A function to check the third piece in a winning line

function checkThird(first, firstSize, second, secondSize, direction) {
    for (k = 0; k < placedPieces.length; k++) {
        if ((placedPieces[k] != first) && (placedPieces[k] != second)) {
            // Check to see if colors are the same
            if (placedPieces[k].color == first.color) {
                const pieceThreeSize = getSize(placedPieces[k]);
                // Check to see if piece three is the same size or smaller than
                // the other two pieces
                if (((firstSize > secondSize) && (secondSize > pieceThreeSize)) 
                || 
                ((firstSize == secondSize) && (secondSize == pieceThreeSize))) {
                    // Check to see if third piece is adjacent
                    if (direction == 'horizontal') {
                        if (placedPieces[k].row == second.row) {
                            const pieceThree = placedPieces[k];
                            const winningPieces = [first, second, pieceThree];
                            return winningPieces;
                        }
                    }
                    if (direction == 'vertical') {
                        if (placedPieces[k].column == second.column) {
                            const pieceThree = placedPieces[k];
                            const winningPieces = [first, second, pieceThree];
                            return winningPieces;
                        }
                    }
                    if (direction == 'diagonal') {
                        if (((placedPieces[k].row == (second.row - 1)) && (second.row == (first.row - 1))) ||
                        ((placedPieces[k].row == (second.row + 1)) && (second.row == (first.row + 1)))
                        ) {
                            if (((placedPieces[k].column == (second.column - 1)) && (second.column == (first.column - 1))) ||
                            ((placedPieces[k].column == (second.column + 1)) && (second.column == (first.column + 1)))
                            ) {
                                const pieceThree = placedPieces[k];
                                const winningPieces = [first, second, pieceThree];
                                return winningPieces;
                            }

                        }
                    }
                }
            }
        }
    }
    return false;
}
// A function to check to see if there is a winner

function checkWinner() {
    
    // Check for nested
    for (n = 0; n < placedPieces.length; n = n+3) {
        if (placedPieces[n].color != '') {
            if ((placedPieces[n + 1]).color != '') {
                if ((placedPieces[n + 2].color) != '') {
                    if ((placedPieces[n].color == (placedPieces[n +1]).color) && ((placedPieces[n].color == (placedPieces[n + 2]).color))) {
                        const pieceOne = placedPieces[n];
                        const pieceTwo = placedPieces[n + 1];
                        const pieceThree = placedPieces[n + 2];
                        const winningPieces = [pieceOne, pieceTwo, pieceThree];
                        return winningPieces;
                    }
                }
            }
        }
    };
    // Check for linear win
    for (i = 0; i < placedPieces.length; i++) {
        if (placedPieces[i].color != '') { // initiate the first piece
            const pieceOne = placedPieces[i];
            const pieceOneSize = getSize(pieceOne);
            console.log(pieceOneSize);
            // Find a second piece
            for (j = 0; j < placedPieces.length; j++) {
                // Check to see if colors are the same
                if ((placedPieces[j] != pieceOne) && placedPieces[j].color == pieceOne.color) {
                    const pieceTwoSize = getSize(placedPieces[j]);
                    /* Check to see if placedPieces[j] is the same size or smaller */
                    if (pieceOneSize >= pieceTwoSize) {
                        // Check to see if placedPieces[j] is adjacent
                        if (
                            ((pieceOne.row == placedPieces[j].row) && (pieceOne.column == (placedPieces[j].column - 1))) 
                            ||
                            ((pieceOne.row == placedPieces[j].row) && (pieceOne.column == (placedPieces[j].column + 1))) 
                        ) {
                            const pieceTwo = placedPieces[j];
                            const winningLine = 'horizontal';
                            const winner = checkThird(pieceOne, pieceOneSize, pieceTwo, pieceTwoSize, winningLine);
                            if (winner != false) {
                                return winner;
                            };
                        };
                        if (
                            ((pieceOne.row == (placedPieces[j].row - 1)) && (pieceOne.column == placedPieces[j].column)) ||
                            ((pieceOne.row == (placedPieces[j].row + 1)) && (pieceOne.column == placedPieces[j].column))
                        ) {
                            const pieceTwo = placedPieces[j];
                            const winningLine = 'vertical';
                            const winner = checkThird(pieceOne, pieceOneSize, pieceTwo, pieceTwoSize, winningLine);
                            if (winner != false) {
                                return winner;
                                };
                             }
                        if (
                            ((pieceOne.row == (placedPieces[j].row - 1)) && (pieceOne.column == (placedPieces[j].column - 1))) ||
                            ((pieceOne.row == (placedPieces[j].row + 1)) && (pieceOne.column == (placedPieces[j].column + 1)))
                        ) {
                            const pieceTwo = placedPieces[j];
                            const winningLine = 'diagonal';
                            const winner = checkThird(pieceOne, pieceOneSize, pieceTwo, pieceTwoSize, winningLine);
                            if (winner != false) {
                                return winner;
                                };
                            };
                        if (
                            ((pieceOne.row == (placedPieces[j].row + 1)) && (pieceOne.column == (placedPieces[j].column - 1))) ||
                            ((pieceOne.row == (placedPieces[j].row - 1)) && (pieceOne.column == (placedPieces[j].column + 1)))
                        ) {
                            const pieceTwo = placedPieces[j];
                            const winningLine = 'diagonal';
                            const winner = checkThird(pieceOne, pieceOneSize, pieceTwo, pieceTwoSize, winningLine);
                            if (winner != false) {
                                return winner;
                                };
                            };
                    };
                    
                    
                };
                
            };
        };
    };
    return false;
};

// A function to grey out all game pieces except winning ones

function greyOut(winningPieces) {
    let greyBoard = document.getElementById("game-board");
    greyBoard.style.backgroundColor = "gainsboro";
    const firstID = winningPieces[0].id;
    const secondID = winningPieces[1].id;
    const thirdID = winningPieces[2].id;
    gamePieceDivs.forEach((item) => {
        if (item.id != firstID) {
            if (item.id != secondID) {
                if (item.id != thirdID) {
                    item.style.borderColor = "grey";
                }
            }
        }
    }
    )
    boardPieceDivs.forEach((item) => {
        item.style.borderColor = "darkgrey";

    }
    )

}