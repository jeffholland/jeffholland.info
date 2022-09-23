function Coord(x, y) {
    this.x = x;
    this.y = y;
}

//==============================================
// green player aka snake
//==============================================

const Player = {
    // basic attributes
    size: 40,
    direction: "up",
    state: new Coord (width / 2, height / 2),

    // bending the body of the snake
    bends: [],

    add_bend: function(x, y) {
        this.bends.push(new Coord(x, y));
    },

    // lower speed is slower (1 is update speed which is very fast)
    speed: 0.5,

    // how long is the snake in units (rectangles)
    length: 1,

    grow: function() {
        this.length += 1;
    },

    draw: function(ctx) {
        ctx.fillStyle = "green";
        for (let i = 0; i < Player.length; i++) {
            let x;
            let y;
            let bend_idx = 0;

            // need to figure out how to iterate through
            // the bends array to draw bends...

            switch (this.direction) {
                case "up":
                    x = this.state.x;
                    y = this.state.y + (i * this.size);
                    break;
                case "down":
                    x = this.state.x;
                    y = this.state.y - (i * this.size);
                    break;
                case "left":
                    x = this.state.x + (i * this.size);
                    y = this.state.y;
                    break;
                case "right":
                    x = this.state.x - (i * this.size);
                    y = this.state.y;
                    break;
            }

            ctx.fillRect(x, y, Player.size, Player.size);
        }
    },

    move: function(progress) {
            switch (this.direction) {
                case "up":
                    this.state.y -= progress * this.speed;
                    break;
                case "down":
                    this.state.y += progress * this.speed;
                    break;
                case "left":
                    this.state.x -= progress * this.speed;
                    break;
                case "right":
                    this.state.x += progress * this.speed;
                    break;
            }

            // Set wall boundaries

            if (this.state.x > width) {
                this.state.x -= width;
            }
            if (this.state.x < 0) {
                this.state.x += width;
            }
            if (this.state.y > height) {
                this.state.y -= height;
            }
            if (this.state.y < 0) {
                this.state.y += height;
            }
    }
}