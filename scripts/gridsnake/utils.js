const debug = true;

class Coord {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
    // bool for whether this is a screen coordinate or a grid coordinate
    screen = false;

    // convert grid coordinate to screen coordinate
    convertToScreen() {
        this.x = this.x * gridSize;
        this.y = this.y * gridSize;
        this.screen = true;
    }

    // convert screen coordinate to grid coordinate
    convertToGrid() {
        this.x = Math.floor(this.x / gridSize);
        this.y = Math.floor(this.y / gridSize);
        this.screen = true;
    }
}