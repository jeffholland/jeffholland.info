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
        console.log(Player);

        if (Player.tail == undefined) {
            Player.tail = Player.head;
        }

        let x = Player.tail.coord.x;
        let y = Player.tail.coord.y;

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

        Player.tail.next = new Node(new Coord(x, y));
        Player.tail = Node();
    },

    progress_threshold: 250,
    progress_counter: 0,

    move: function(progress) {

        // Track progress to control pace of movement
        Player.progress_counter += progress;
        if (Player.progress_counter < Player.progress_threshold) {
            return;
        }

        // Rest of function only executes when progress_counter goes over threshold
        
        Player.progress_counter = 0;

        let current = Player.head;
        let currentDirection = Player.direction;

        // Iterate through nodes
        while (current != null) {

            switch (currentDirection) {

                case "up":
                    current.coord.y -= gridSize;
                    break;

                case "down":
                    current.coord.y += gridSize;
                    break;

                case "left":
                    current.coord.x -= gridSize;
                    break;

                case "right":
                    current.coord.x += gridSize;
                    break;

            }

            if (current.next != null) {
                this.moveChangeDirection(current, currentDirection);
            }

            current = current.next;
        }
    },

    moveChangeDirection: function(current, currentDirection) {
        switch (currentDirection) {

            case "up":
                if (current.next.coord.x > current.coord.x) {
                    currentDirection = "right";
                } else if (current.next.coord.x < current.coord.x) {
                    currentDirection = "left";
                }
                break;

            case "down":
                if (current.next.coord.x > current.coord.x) {
                    currentDirection = "left";
                } else if (current.next.coord.x < current.coord.x) {
                    currentDirection = "right";
                }
                break;

            case "left":
                if (current.next.coord.x > current.coord.x) {
                    currentDirection = "down";
                } else if (current.next.coord.x < current.coord.x) {
                    currentDirection = "up";
                }
                break;

            case "right":
                if (current.next.coord.x > current.coord.x) {
                    currentDirection = "up";
                } else if (current.next.coord.x < current.coord.x) {
                    currentDirection = "down";
                }
                break;
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