let t;
let dx;
let x, y;
let inp1, inp2, button;
let started = false;
let omega = 0;
let theta = 0;
let amplitude = 0;
let phase_shift = 0;
let x_spacing = 0.5;
let fundamental_period = 0;
let frame_count = 0;
let cos_points = [];
let sin_points = [];

function setup() {
    var myCanvas = createCanvas(1000, 700);
    myCanvas.parent("main-container");
    w = myCanvas.width;
    h = myCanvas.height;
    sin_points = new Array(floor(w / x_spacing));
    cos_points = new Array(floor(w / x_spacing));
    stroke('#fae');
    strokeWeight(3);
    noFill();
    amplitude_slider = createSlider(0, 10, 1, .25).attribute('placeholder', 'Amplitude');
    amplitude_slider.position(1100, 200);
    label1 = createP("Amplitude");
    label1.position(1100, 150);

    
    period_slider = createSlider(0.4, 4, 1, 0.05).attribute('placeholder', 'Period');
    period_slider.position(1100, 260);
    label2 = createP("Period")
    label2.position(1100, 210)

    button = createButton("Simulate!");
    button.position(1100, 300);
    button.mousePressed( () => {
        started = true
    });
}

function draw() {
    background(29);
    translate(w/4, h/4);
    drawAxes();
    
    if(!started) {
        return;
    }
    
    simulate();
    
    if(1) {
        return;
    }
    
    fundamental_period = PI;
    amplitude = 2; // radius == amplitude
    fundamental_period = fundamental_period * 90;
    amplitude = amplitude * 20;
    omega = TWO_PI / fundamental_period;
    t = frameCount;
    phase_shift = PI/8;
    theta = omega * t + phase_shift;
    dx = omega * x_spacing; // 2πf * point_frequency
    y = amplitude * sin(-theta); // y = r sinΘ
    x = amplitude * sin(theta + PI/2); // x = r cosΘ
    calcWave(y, x);
    drawSignal();
    drawVector(y, x);
}

function simulate() {
    fundamental_period = period_slider.value() * 100;
    amplitude = amplitude_slider.value() * 20;
    omega = TWO_PI / fundamental_period;
    t = frameCount/3;
    // phase_shift = PI/8
    theta = omega * t + phase_shift;
    dx = omega * x_spacing; // 2πf * point spacing
    y = amplitude * sin(-theta); // y = r sinΘ
    x = amplitude * sin(theta + PI/2); // x = r cosΘ
    calcWave(y, x);
    drawSignal();
    drawVector(y, x);
    
}

function calcWave() {
    let x = theta;
    // for every x val, calculate the y val
    for (let i = 0; i < sin_points.length; i++) {
        sin_points[i] = amplitude * sin(-x);
        x -= dx;
    }
    x = theta
    for (let i = 0; i < cos_points.length; i++) {
        cos_points[i] = amplitude * sin(x + PI / 2);
        x -= dx;
    }
} 
function drawSignal() {
    push();
    stroke('#48ADD2');
    fill('#48ADD2');
    strokeWeight(3);
    for (let x = 0; x < sin_points.length; x++) {
        ellipse(x * x_spacing, sin_points[x], 2, 2);
    }
    pop()
    push();
    stroke('#85FDF8');
    fill('#85FDF8');
    for (let x = 0; x < cos_points.length; x++) {
        ellipse(cos_points[x], x * x_spacing, 2, 2);
    }
    pop();
}

function drawVector(y, x) {
    push();
    stroke("purple");
    circle(0, 0, amplitude*2)
    line(0, 0, x, y);
    drawProjections(y, x);
    pop();
}

function drawProjections(y, x) {
    push();
    stroke('#48ADD2');
    strokeWeight(0.5);
    line(x, 0, x, y);
    pop();
    push();
    strokeWeight(0.5);
    stroke('#85FDF8');
    line(x, y, 0, y);
    pop();
    push();
    stroke('#48ADD2');
    fill('#48ADD2');
    drawOscillations(0, y);
    push();
    stroke('#85FDF8');
    fill('#85FDF8');
    drawOscillations(x, 0);
}

function drawOscillations(x, y) {
    circle(x, y, 10); // sin
    pop();
}

function drawAxes() {
    push();
    stroke("grey");
    line(-w, 0, w, 0);
    line(0, -h, 0, h);
    pop();
}
