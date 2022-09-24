// Player is a linked list of nodes
// containing a Coord (see utils.js) and a pointer to next node

class Node {
    constructor(coord) {
        this.coord = coord;
        this.next = null;
    }
}

// Player class contains pointers to head and tail nodes

const Player = {
    direction: "down",

    head: new Node(new Coord(0, 0)),
    tail: this.head,

    growSnake: function() {
        let x = Player.tail.x;
        let y = Player.tail.y;

        switch (Player.direction) {
            case "up":
                y += gridSize;
                break;
            case "down":
                y -= gridSize;
                break;
            case "left":
                x += gridSize;
                break;
            case "right":
                x -= gridSize;
                break;
        }

        Player.tail.next = new Node(x, y);
        Player.tail = Player.tail.next;
    },

    progress_threshold: 500,
    progress_counter: 0,

    move: function(progress) {
        // Track progress to control pace of movement
        // Rest of function only executes when counter goes over thresghold
        Player.progress_counter += progress;
        if (Player.progress_counter < Player.progress_threshold) {
            return;
        }

        let current = Player.head;
        let currentDirection = Player.direction;
        
        Player.progress_counter = 0;

        // Iterate through nodes
        while (current != null) {

            switch (currentDirection) {

                case "up":
                    current.coord.y -= gridSize;
                    if (current.next != null) {
                        if (current.next.coord.x > current.coord.x) {
                            currentDirection = "right";
                        } else if (current.next.coord.x < current.coord.x) {
                            currentDirection = "left";
                        }
                    }
                    break;

                case "down":
                    current.coord.y += gridSize;
                    if (current.next != null) {
                        if (current.next.coord.x > current.coord.x) {
                            currentDirection = "left";
                        } else if (current.next.coord.x < current.coord.x) {
                            currentDirection = "right";
                        }
                    }
                    break;

                case "left":
                    current.coord.x -= gridSize;
                    if (current.next != null) {
                        if (current.next.coord.x > current.coord.x) {
                            currentDirection = "down";
                        } else if (current.next.coord.x < current.coord.x) {
                            currentDirection = "up";
                        }
                    }
                    break;

                case "right":
                    current.coord.x += gridSize;
                    if (current.next != null) {
                        if (current.next.coord.x > current.coord.x) {
                            currentDirection = "up";
                        } else if (current.next.coord.x < current.coord.x) {
                            currentDirection = "down";
                        }
                    }
                    break;

            }

            current = current.next;
        }
    },

    draw: function(ctx) {
        ctx.fillStyle = "green";

        let current = Player.head;

        while (current != null) {
            ctx.fillRect(current.coord.x, current.coord.y, gridSize, gridSize);

            if (debug) {
                console.log("Drawing node at " + current.coord.x + ", " + current.coord.y);
            }

            current = current.next;
        }
    },

} 