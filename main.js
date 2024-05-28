// main.js

// Matter.js module aliases
let Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint;

// Function to initialize Matter.js components and simulation
function initMatterJs() {
    Engine = Matter.Engine;
    Render = Matter.Render;
    Runner = Matter.Runner;
    Bodies = Matter.Bodies;
    Composite = Matter.Composite;
    Mouse = Matter.Mouse;
    MouseConstraint = Matter.MouseConstraint;

    // create an engine
    const engine = Engine.create();
    const world = engine.world;

    // create a renderer
    const render = Render.create({
        element: document.body,
        canvas: document.getElementById('world'),
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: '#333436',
            wireframes: false,
        }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    const boxes = [];
    for (let i = 0; i < 5; i++) {
        boxes.push(Bodies.rectangle(400 + i * 80, 200, 60, 60, { 
            render: { fillStyle: '#00f' }
        }));
    }
    Composite.add(world, boxes);

    // add ground
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 10, window.innerWidth, 20, { isStatic: true });
    Composite.add(world, ground);

    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            render: { visible: false }
        }
    });
    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // resize the canvas on window resize
    window.addEventListener('resize', () => {
        render.canvas.width = window.innerWidth;
        render.canvas.height = window.innerHeight;
        Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight - 10 });
    });
}

// Ensure Matter.js is loaded before initializing the simulation
function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

// Load Matter.js from CDN and initialize the simulation
loadScript('https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.18.0/matter.min.js', initMatterJs);
