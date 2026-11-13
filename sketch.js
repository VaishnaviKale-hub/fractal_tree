const r = require("raylib");
const g = require("./geometry.js");

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    const screen = { width: 1500, height: 1000, fps: 100 };

    r.InitWindow(screen.width, screen.height, "Fractal Tree");

    const turtle = {
        x: screen.width / 2,
        y: screen.height - 10,
        angle: -90,
    };

    const treeConfig = {
        length: 20,
        generations: 5,
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

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.RAYWHITE);
    const turtle = {
        x: world.screen.width / 2,
        y: world.screen.height,
        angle: -90
    };

    const pattern = g.fractalTree(
        world.treeConfig.generations
    );

    for (const symbol of pattern) {

        if (symbol === "1") {
            const oldX = turtle.x;
            const oldY = turtle.y;

            moveForward(
                turtle,
                world.treeConfig.length
            );

            r.DrawLine(
                oldX,
                oldY,
                turtle.x,
                turtle.y,
                r.BLACK
            );
        }

        else if (symbol === "[") {
            world.stateStack.push({
                x: turtle.x,
                y: turtle.y,
                angle: turtle.angle
            });

            turtle.angle += 45;
        }

        else if (symbol === "]") {
            const state = world.stateStack.pop();

            turtle.x = state.x;
            turtle.y = state.y;
            turtle.angle = state.angle;
        }

        else if (symbol === "0") {
            // nothing
        }
    }

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

