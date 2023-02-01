function setMines(A, n) {
    console.log('[setMines] A.length:', A.length);
    for (let i = 0; i < n; i++) {
        let x = Math.floor(Math.random() * A.length);
        let y = Math.floor(Math.random() * A.length);
        A[x][y] = 'B';
    }
}

function setNeighbours(A) {
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A.length; j++) {
            if (A[i][j] === 'B') {
                continue;
            }
            let count = 0;
            if (i > 0 && j > 0 && A[i - 1][j - 1] === 'B') {
                count++;
            }
            if (i > 0 && A[i - 1][j] === 'B') {
                count++;
            }
            if (i > 0 && j < (A.length -1) && A[i - 1][j + 1] === 'B') {
                count++;
            }
            if (j > 0 && A[i][j - 1] === 'B') {
                count++;
            }
            if (j < (A.length -1) && A[i][j + 1] === 'B') {
                count++;
            }
            if (i < (A.length -1) && j > 0 && A[i + 1][j - 1] === 'B') {
                count++;
            }
            if (i < (A.length -1) && A[i + 1][j] === 'B') {
                count++;
            }
            if (i < (A.length -1) && j < (A.length -1) && A[i + 1][j + 1] === 'B') {
                count++;
            }
            A[i][j] = count;
        }
    }
}

function unhideZeros(A, B) {
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A.length; j++) {
            if (B[i][j] === 1) {
                if (A[i][j] == '0') {
                    if (i > 0 && j > 0 && B[i - 1][j - 1] === 0) {
                        B[i - 1][j - 1] = 1;
                    }
                    if (i > 0 && B[i - 1][j] === 0) {
                        B[i - 1][j] = 1;
                    }
                    if (i > 0 && j < (A.length -1) && B[i - 1][j + 1] === 0) {
                        B[i - 1][j + 1] = 1;
                    }
                    if (j > 0 && B[i][j - 1] === 0) {
                        B[i][j - 1] = 1;
                    }
                    if (j < (A.length -1) && B[i][j + 1] === 0) {
                        B[i][j + 1] = 1;
                    }
                    if (i < (A.length -1) && j > 0 && B[i + 1][j - 1] === 0) {
                        B[i + 1][j - 1] = 1;
                    }
                    if (i < (A.length -1) && B[i + 1][j] === 0) {
                        B[i + 1][j] = 1;
                    }
                    if (i < (A.length -1) && j < (A.length -1) && B[i + 1][j + 1] === 0) {
                        B[i + 1][j + 1] = 1;
                    }
                }
            }
        }
    }
}

function unhideAll(B) {
    for (let i = 0; i < B.length; i++) {
        for (let j = 0; j < B.length; j++) {
            B[i][j] = 1;
        }
    }
}

function gameOver(context) {
    context.fillStyle = 'white';
    context.fillRect(100, 80, 200, 100);
    context.fillStyle = 'red';
    context.font = 'bold 30px Arial';
    context.fillText('Game Over', 120, 140);
    // Draw border
    context.strokeStyle = "red";
    context.strokeRect(100, 80, 200, 100);
}

function gameWon(A, B, gameStatus, context) {
    // Check if all non-mine cells are unhidden
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A.length; j++) {
            if ((B[i][j] === 1 && A[i][j] !== 'B') || (B[i][j] === 2 && A[i][j] == 'B')) {
                // console.log('continue');
                continue;
            } else {
                // console.log('return');
                return false;
            }
        }
    }
    console.log('game won', gameStatus);
    if (gameStatus == 0) {
        context.fillStyle = 'white';
        context.fillRect(100, 80, 200, 100);
        context.fillStyle = 'green';
        context.font = 'bold 30px Arial';
        context.fillText('You Won!', 130, 140);
        // Draw border
        context.strokeStyle = "green";
        context.strokeRect(100, 80, 200, 100);
        return true;
    }
}

function initMinefield(gridSize) {
    A = []; B = []; gameStatus = 0;

    for (let i = 0; i < gridSize; i++) {
        A.push([]);
        B.push([]);
        for (let j = 0; j < gridSize; j++) {
            A[i].push('');
            B[i].push(0);
        }
   }
}


function initGame(gridSize, mines) {
    initMinefield(gridSize);
    setMines(A, mines);
    setNeighbours(A);
}

// IIFE
(function () {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const gridSize = 16;
    const cellSize = 40;
    const mines = 40;

    initGame(gridSize, mines);

    function draw() {
        context.clearRect(0, 0, width, height);
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                context.strokeStyle = "black";
                context.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
                // if rectangle is unhidden
                if (B[i][j] === 1) {
                    if (A[i][j] == 'B') {
                        unhideAll(B);
                        context.fillStyle = 'red';
                        context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                        gameOver(context);
                        gameStatus = 1;
                    } else if (A[i][j] == '0') {
                        context.fillStyle = 'lightgray';
                        context.font = "30px Arial";
                        context.fillText(A[i][j], i * cellSize + 10, j * cellSize + 30);
                        if (gameStatus == 1) {
                            gameOver(context);
                        }
                    } else {
                        context.fillStyle = 'black';
                        context.font = "30px Arial";
                        context.fillText(A[i][j], i * cellSize + 10, j * cellSize + 30);
                        if (gameStatus == 1) {
                            gameOver(context);
                        }
                    }
                    // if rectangle is marked
                } else if (B[i][j] === 2) {
                    context.fillStyle = 'blue';
                    context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                }
            }
        }

        unhideZeros(A, B);
        // console.log(B);
        gameWon(A, B, gameStatus, context);

        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);

    document.addEventListener('mousedown', function (event) {
        // if left click
        if (event.button === 0) {
            let x = Math.floor(event.clientX / cellSize);
            let y = Math.floor(event.clientY / cellSize);
            console.log(x, y);
            console.log(event.clientX, event.clientY);
            B[x][y] = 1;
        }
    });

    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        let x = Math.floor(event.clientX / cellSize);
        let y = Math.floor(event.clientY / cellSize);
        if (B[x][y] === 0) {
            B[x][y] = 2;
        } else if (B[x][y] === 2) {
            B[x][y] = 0;
        }
    });

    document.addEventListener("keydown", function (event) {
        console.log(event.keyCode);
        if (event.keyCode === 27) {
            initGame(gridSize, mines);
        }
    });
})();

