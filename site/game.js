const canvas = document.getElementById('application');
const app = new pc.Application(canvas, {});

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const FORWARDS = -1
const BACKWARDS = 1;

app.start();
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

const light = new pc.Entity();
light.addComponent('light');
light.setEulerAngles(90, 90, 45);
app.root.addChild(light);

app.scene.ambientLight = new pc.Color(0.7, 0.7, 0.6);


class Player {
    constructor(x, y, z, alpha, beta, gamma, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.alpha = alpha;
        this.beta = beta;
        this.gamma = gamma;
        this.cube = new pc.Entity();
        app.root.addChild(this.cube);
        this.cube.setPosition(x, y, z);
        this.cube.setEulerAngles(alpha, beta, gamma);
        this.cube.addComponent('model', {
            type: type
        });
    }
}

class MainPlayer extends Player {
    constructor(x, y, z, alpha, beta, gamma, type) {
        super(x, y, z, alpha, beta, gamma, type);
        this.camera = new pc.Entity();
        this.v = .1;
        app.root.addChild(this.camera);
        this.camera.addComponent('camera', {
            clearColor: new pc.Color(0, 0, 0.1)
        });
        this.camera.setPosition(x, y, z);
        this.camera.setEulerAngles(alpha, beta, gamma);
        window.addEventListener("keydown", e => {
            switch (e.keyCode) {
                case KEY_UP:
                    this.move(FORWARDS);
                    break;
                case KEY_DOWN:
                    this.move(BACKWARDS)
                    break;
                case KEY_RIGHT:
                    this.turn(FORWARDS);
                    break;
                case KEY_LEFT:
                    this.turn(BACKWARDS);
                    break;
            }
        });
    }

    turn(direction) {
        this.beta += direction;
        this.updatePositions();
    }    

    move(direction) {
        this.x += this.v * Math.sin(this.beta * Math.PI / 180) * direction;
        this.z += this.v * Math.cos(this.beta * Math.PI / 180) * direction;
        this.updatePositions();
    }

    updatePositions() {
        this.cube.setPosition(this.x, this.y, this.z);
        this.cube.setEulerAngles(this.alpha, this.beta, this.gamma);
        this.camera.setPosition(this.x, this.y, this.z);
        this.camera.setEulerAngles(this.alpha, this.beta, this.gamma);
    }
}

let player = new Player(0, 0, 0, 45, 45, 0, 'box');
let player2 = new Player(10, 0, 0, 0, 0, 0, 'box');
let player3 = new MainPlayer(0, 0, 10, 0, 0, 0, 'box');