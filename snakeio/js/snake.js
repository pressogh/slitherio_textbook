class Snake {
    constructor(ctx, name, id) {
        this.ctx = ctx;
        this.name = name;
        this.id = id;
        this.score = 0;
        this.force = 5;
        this.state = 0;

        this.pos = new Point(game.SCREEN_SIZE.x / 2, game.SCREEN_SIZE.y / 2);
        this.velocity = new Point(0, 0); //arbitary point
        this.angle = ut.random(0, Math.PI);

        this.length = 10;
        this.MAXSIZE = 12;
        this.size = 7;

        // color
        this.mainColor = ut.randomColor();
        this.midColor = this.mainColor;
        this.supportColor = this.mainColor;

        this.arr = [];
        this.arr.push(
            new Point(game.SCREEN_SIZE.x / 2, game.SCREEN_SIZE.y / 2)
        );
        for (var i = 1; i < this.length; i++) {
            this.arr.push(new Point(this.arr[i - 1].x, this.arr[i - 1].y));
        }
    }

    drawHeadOneEye() {
        var x = this.arr[0].x;
        var y = this.arr[0].y;

        //head
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size + 2, 0, 2 * Math.PI);
        this.ctx.fill();

        //face
        this.ctx.fillStyle = "whitesmoke";
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();

        //eye
        var d = 2;
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc(
            x + d * Math.cos(this.angle),
            y + d * Math.sin(this.angle),
            this.size / 1.5,
            0,
            2 * Math.PI
        );
        this.ctx.fill();

        //retina
        var d = 3;
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(
            x + d * Math.cos(this.angle),
            y + d * Math.sin(this.angle),
            this.size / 4,
            0,
            2 * Math.PI
        );
        this.ctx.fill();

        //name
        this.ctx.fillStyle = "whitesmoke";
        this.ctx.font = "10px Arial";
        this.ctx.fillText(this.name, x - 5, y - 10);
    }

    drawBody(x, y, i) {
        var grd = this.ctx.createRadialGradient(x, y, 2, x + 4, y + 4, 10);
        grd.addColorStop(0, this.supportColor);
        grd.addColorStop(1, this.midColor);

        var radius = this.size - i * 0.01;
        if (radius < 0) radius = 1;

        this.ctx.beginPath();
        this.ctx.fillStyle = this.mainColor;
        this.ctx.arc(x, y, radius + 1, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.fillStyle = grd;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    move() {
        this.velocity.x = this.force * Math.cos(this.angle);
        this.velocity.y = this.force * Math.sin(this.angle);

        //magic
        var d = this.size / 2;
        for (var i = this.length - 1; i >= 1; i--) {
            this.arr[i].x = this.arr[i - 1].x - d * Math.cos(this.angle);
            this.arr[i].y = this.arr[i - 1].y - d * Math.sin(this.angle);
            this.drawBody(this.arr[i].x, this.arr[i].y, i);
        }

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.drawHeadOneEye();

        this.checkCollissionFood();
        this.checkCollissionSnake();
    }

    //check snake and food collission
    checkCollissionFood() {
        var x = this.arr[0].x;
        var y = this.arr[0].y;
        for (var i = 0; i < game.foods.length; i++) {
            if (
                ut.cirCollission(
                    x,
                    y,
                    this.size + 3,
                    game.foods[i].pos.x,
                    game.foods[i].pos.y,
                    game.foods[i].size
                )
            ) {
                game.foods[i].die();
                this.addScore();
                this.incSize();
            }
        }
    }

    checkCollissionSnake() {
        var x = this.arr[0].x;
        var y = this.arr[0].y;
        for (var i = 0; i < game.snakes.length; i++) {
            var s = game.snakes[i];
            if (s !== this) {
                for (var j = 0; j < game.snakes[i].arr.length; j += 2) {
                    if (
                        ut.cirCollission(
                            x,
                            y,
                            this.size,
                            s.arr[j].x,
                            s.arr[j].y,
                            s.size
                        )
                    ) {
                        this.die();
                    }
                }
            }
        }
    }

    addScore() {
        this.length++;
        this.score++;
        this.arr.push(new Point(-100, -100));
    }

    incSize() {
        if (this.length % 30 == 0) this.size++;
        if (this.size > this.MAXSIZE) this.size = this.MAXSIZE;
    }

    changeAngle(angle) {
        this.angle = angle;
    }

    die() {
        this.state = 1;
        for (var i = 0; i < this.arr.length; i += 3)
            game.foods.push(
                new Food(game.ctxFood, this.arr[i].x, this.arr[i].y)
            );

        var index = game.snakes.indexOf(this);
        game.snakes.splice(i, 1);
    }
}
