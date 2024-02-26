let angle = 0;
let theta = 0;
let t;
let amplitude = 0;
let cos_points = [];
let sin_points = [];
let frame_count = 0;

function setup() {
    createCanvas(950, 700);
    w = createCanvas(950, 700).width;
    h = createCanvas(950, 700).height;
    stroke('#fae');
    strokeWeight(3);
    angleMode(RADIANS);
    noFill();

}

function draw() {
    background(29);
    frame_count ++;
    // make center of screen  starting point
    translate(w/2, h/2);
    drawAxes()
    amplitude = 75; // radius == amplitude
    angle = 0.05;
    t = frameCount/5;
    theta = angle * t;
    y = amplitude * sin(-theta); // y = r sinΘ
    x = amplitude * sin(theta + PI/2); // x = r cosΘ
    drawVector(y, x);
    drawOscillations(y, x);
    circle(0, 0, 2 * amplitude);
    drawSignal(t, y, x);
}

function drawSignal(t, y2, y1) {
    push();
    stroke("pink");
    strokeWeight(2);
    // point(t, y2); // sin
    sin_points.push([t, y2])
    // point(y1, t); // cos
    cos_points.push([y1, t])
    for(let i = 0; i < sin_points.length; i++) {
        x = sin_points[i][0];
        y = sin_points[i][1];
        point(x, y);
    }

    for(let i = 0; i < cos_points.length; i++) {
        x = cos_points[i][0];
        y = cos_points[i][1];
        point(x, y);
    }
    // sin_points.append(point(t, y2));
    // cos_points.append(point(y1, t));
    pop();


}

function drawVector(y, x) {
    push();
    stroke("purple");
    line(0, 0, x, y);
    drawProjections(y, x);
    pop();
}

function drawProjections(y, x) {
    push();
    stroke("yellow");
    line(x, 0, x, y);
    line(x, y, 0, y);
    pop()
}

function drawOscillations(y, x) {
    push();
    stroke("blue");
    fill("blue")
    circle(0, y, 5); // sin
    circle(x, 0, 5); // cos
    pop();

}

function drawAxes() {
    stroke("grey")
    line(-w, 0, w, 0)
    line(0, -h, 0, h)
}

