function Coord(x, y) {
    this.x = x;
    this.y = y;
}

function Bend(prev_direction, idx) {
    this.prev_direction = prev_direction;
    this.idx = idx;
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
    // bends: [],
    // bend_idx: 0,

    add_bend: function(prev_direction) {
        this.bends.push( new Bend(prev_direction, 0) );
    },

    remove_bend: function() {
        this.bends.shift();
    },

    // lower speed is slower (1 is update speed which is very fast)
    speed: 0.5,

    // how long is the snake in units (rectangles)
    length: 1,

    grow: function() {
        this.length += 1;
    },

    change_direction: function(new_direction) {
        // Add bend to bends array with previous direction
        this.add_bend(Player.direction);

        Player.direction = new_direction;
    },

    draw: function(ctx) {
        ctx.fillStyle = "green";

        // Iterate over the length of the snake
        // and the bends in the snake
        
        // Player.bend_idx = 0;

        for (let i = 0; i < Player.length; i++) {
            let x;
            let y;

            // // If we aren't out of bends
            // if (Player.bend_idx < Player.bends.length) {

            //     // If current snake node idx == idx of current bend
            //     if (i == bends[Player.bend_idx].idx) {
            //         Player.direction = bends[Player.bend_idx].prev_direction;
            //         Player.bend_idx += 1;
            //     }
            // }

            // Paint according to current direction

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
    },
}