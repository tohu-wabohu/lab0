function fillCircle(context, x, y, radius, color = "red") {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
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

// IIFE
(function () {
    bounce("canvas1");
    control("canvas2");
})();
