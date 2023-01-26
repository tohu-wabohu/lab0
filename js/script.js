function fillCircle(context, x, y, radius, color = "red") {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
}

// IIFE
(function () {
    const canvas = document.getElementById("canvas1");
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const radius = 50;
    const speed = 4;

    let x = width / 2;
    let y = height / 2;
    let dx = speed;
    let dy = speed;
    function step() {
        window.requestAnimationFrame(step);
        // const timestamp = new Date();
        // console.log("step:", timestamp.toJSON());
        x += dx;
        y += dy;
        if (x + radius > width  || x - radius < 0) { dx = -dx; }
        if (y + radius > height || y - radius < 0) { dy = -dy; }
        context.clearRect(0, 0, width, height);
        fillCircle(context, x, y, radius);
    }
    console.log(width, height);

    window.requestAnimationFrame(step);

    document.addEventListener("keydown", function (event) {
        console.log(event.key);
    });

})();
