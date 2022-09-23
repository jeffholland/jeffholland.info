// Player is a linked list of nodes

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.next = null;
    }
}

const Player = {
    direction: "up",

    head: new Node(0, 0),
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

    move: function() {
        let current = this.head;
        let currentDirection = this.direction;

        while (current != null) {
            switch (currentDirection) {

                case "up":
                    current.y -= gridSize;
                    if (current.next != null) {
                        if (current.next.x > current.x) {
                            currentDirection = "right";
                        } else if (current.next.x < current.x) {
                            currentDirection = "left";
                        }
                    }
                    break;

                case "down":
                    current.y += gridSize;
                    if (current.next != null) {
                        if (current.next.x > current.x) {
                            currentDirection = "left";
                        } else if (current.next.x < current.x) {
                            currentDirection = "right";
                        }
                    }
                    break;

                case "left":
                    current.x -= gridSize;
                    if (current.next != null) {
                        if (current.next.x > current.x) {
                            currentDirection = "down";
                        } else if (current.next.x < current.x) {
                            currentDirection = "up";
                        }
                    }
                    break;

                case "right":
                    current.x += gridSize;
                    if (current.next != null) {
                        if (current.next.x > current.x) {
                            currentDirection = "up";
                        } else if (current.next.x < current.x) {
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

        let current = this.head;

        while (current != null) {
            ctx.fillRect(current.x, current.y, gridSize, gridSize);
            console.log("Drawing node at " + current.x + ", " + current.y);
            current = current.next;
        }
    }

} 





// const a = new Node(0, 0);
// const b = new Node(1, 0);
// const c = new Node(2, 0);
// const d = new Node(3, 0);

// a.next = b;
// b.next = c;
// c.next = d;

// const printLinkedList = (head) => {
//     let current = head;

//     while (current != null) {
//         console.log("Coordinate: " + current.x + ", " + current.y);
//         current = current.next;
//     }
// };

// printLinkedList(a);