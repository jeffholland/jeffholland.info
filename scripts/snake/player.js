
//==============================================
// green player aka snake
//==============================================

const Player = {
    direction: "up",
    size: 40,
    state: {
        x: (width / 2),
        y: (height / 2)
    },

    // lower speed is slower (1 is update speed which is very fast)
    speed: 0.5,

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