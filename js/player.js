class Player {
    constructor(width, height) {
        this.canvaswidth = width;
        this.canvasheight = height;

        this.x = this.canvaswidth / 2 - 50;
        this.y = this.canvasheight / 2 - 50;
        this.driftX = 0;
        this.driftY = 0;
        this.w = 120;
        this.h = 60;
        this.angle = 0;
    }
    move(direction) {
        switch (direction) {
            case "left":
                if (this.x <= 6) {
                    this.x = 6;
                    this.driftX = 0;
                    this.driftY = 0;
                } else {
                    this.x -= 20;
                    this.driftX = -1;
                }
                break;
            case "right":
                if (this.x + this.w >= this.canvaswidth - 6) {
                    this.x = this.canvaswidth - 6 - this.w;
                    this.driftX = 0;
                    this.driftY = 0;
                } else {
                    this.x += 20;
                    this.driftX = 1;
                }
                break;
            case "up":
                if (this.y <= 6) {
                    this.y = 6;
                    this.driftX = 0;
                    this.driftY = 0;
                } else {
                    this.y -= 20;
                    this.driftY = -1;
                }
                break;
            case "down":
                if (this.y + this.h >= this.canvasheight - 6) {
                    this.y = this.canvasheight - 6 - this.h;
                    this.driftX = 0;
                    this.driftY = 0;
                } else {
                    this.y += 20;
                    this.driftY = 1;
                }
        }
    }
}