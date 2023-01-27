function fillCircle(context, x, y, radius, color = "red") {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
}

function greenColor(i) {
    switch (i) {
        case 1: return "#005800";
        case 2: return "#007600";
        case 3: return "#1E9E1E";
        case 4: return "#32B232";
        case 5: return "#50D050";
    }
}

function bounce(canvasId) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const radius = 50;
    const speed = 4;

    let x = width / 2;
    let y = height / 2;
    let dx = speed;
    let dy = speed;

    function draw() {
        x += dx;
        y += dy;
        if (x + radius > width  || x - radius < 0) { dx = -dx; }
        if (y + radius > height || y - radius < 0) { dy = -dy; }
        context.clearRect(0, 0, width, height);
        fillCircle(context, x, y, radius);
        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
}

function control(canvasId) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const radius = 50;
    const speed = 4;

    let x = width / 2;
    let y = height / 2;
    let dx = 0;
    let dy = 0;

    function draw() {
        x += dx;
        y += dy;

        // keep the circle inside the canvas
        if (y - radius <= 0) { y = radius; }
        if (y + radius >= height) { y = height - radius; }
        if (x - radius <= 0) { x = radius; }
        if (x + radius >= width) { x = width - radius; }

        context.clearRect(0, 0, width, height);
        fillCircle(context, x, y, radius);
        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);

    document.addEventListener("keydown", function (event) {
        console.log(event.key);
        switch (event.key) {
            case "ArrowUp":   dy = -speed; break;
            case "ArrowDown": dy =  speed; break;
            case "ArrowLeft": dx = -speed; break;
            case "ArrowRight":dx =  speed; break;
        }
    });
    document.addEventListener("keyup", function (event) {
        switch (event.key) {
            case "ArrowUp":   dy = 0; break;
            case "ArrowDown": dy = 0; break;
            case "ArrowLeft": dx = 0; break;
            case "ArrowRight":dx = 0; break;
        }
    });
}

function matrix(canvasId) {
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext("2d");
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    const width = canvas.width;
    const height = canvas.height;
    const matrixSize = 100;
    const speedLimit = 5;
    const changeRate = 30;

    context.font = "30px Arial";

    const A = [];

    for (let i = 0; i < matrixSize; i++) {
        c = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 90));
        x = Math.floor(Math.random() * width);
        y = -10;
        s = Math.floor(1 + Math.random() * speedLimit);
        e = changeRate;  // expiration
        A.push([c, x, y, s, e]);
    }

    function draw() {
        context.clearRect(0, 0, width, height);
        context.fillStyle = "black";
        context.fillRect(0, 0, width, height);
        // console.log(A[0][0], A[0][1], A[0][2]);
        for (const I of A) {
            context.fillStyle = greenColor(I[3]);
            context.fillText(I[0], I[1], I[2] += I[3]);
            I[4] -= (1 * I[3]);
            if (I[4] < 0) {
                I[0] = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 90));
                I[4] = changeRate;
            }
            if (I[2] > height) {
                I[0] = String.fromCharCode(0x30A0 + Math.random() * 90);
                I[1] = Math.floor((Math.random() * width));
                I[2] = -10;
                I[3] = Math.floor(1 + Math.random() * speedLimit);
            }
        }
        window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(draw);
}

// IIFE
(function () {
    bounce("canvas1");
    control("canvas2");
    matrix("canvas3");
})();
