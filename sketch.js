const r = require("raylib");
const g = require("./geometry.js");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const screen = { width: 1000, height: 1000, fps: 100 };

    r.InitWindow(screen.width, screen.height, "Fractal Tree");

    const turtle = {
        x: screen.width / 2,
        y: screen.height - 10,
        angle: -90,
    };

    const treeConfig = {
        length: 10,
        generations: 6,
    };

    const stateStack = [];
    const pattern = g.fractalTree(
        treeConfig.generations
    );

    return { screen, turtle, treeConfig, stateStack, pattern };
}

function moveForward(turtle, length) {
    const angleInRadians = (turtle.angle * Math.PI) / 180;

    const directionX = Math.cos(angleInRadians);
    const directionY = Math.sin(angleInRadians);

    turtle.x += directionX * length;
    turtle.y += directionY * length;
}

function update(world) {
    // No  update for the fractal tree
}

function drawBranch(turtle, oldX, oldY) {
    r.DrawLine(
        oldX,
        oldY,
        turtle.x,
        turtle.y,
        r.BLACK
    );
}

function drawTree(pattern, turtle, stateStack, length) {

    for (const symbol of pattern) {

        if (symbol === "1") {
            const oldX = turtle.x;
            const oldY = turtle.y;


            moveForward(turtle, length);

            drawBranch(turtle, oldX, oldY);
        }

        else if (symbol === "L") {
            turtle.angle -= 45;
        }

        else if (symbol === "R") {
            turtle.angle += 45;
        }

        else if (symbol === "[") {
            stateStack.push({
                x: turtle.x,
                y: turtle.y,
                angle: turtle.angle
            });

        }

        else if (symbol === "]") {
            const state = stateStack.pop();

            turtle.x = state.x;
            turtle.y = state.y;
            turtle.angle = state.angle;

        }
    }
}

function resetTurtle(turtle, screen) {
    turtle.x = screen.width / 2;
    turtle.y = screen.height - 10;
    turtle.angle = -90;
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);

    resetTurtle(world.turtle, world.screen);
    world.stateStack.length = 0;

    drawTree(
        world.pattern,
        world.turtle,
        world.stateStack,
        world.treeConfig.length
    );

    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};

