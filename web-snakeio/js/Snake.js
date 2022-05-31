// js/Snake.js

class Snake {
    constructor(ctx, name, id) {
        // 변수 초기화

        this.ctx = ctx;
        this.name = name;
        this.id = id;

        // 점수
        this.score = 0;
        // 속도
        this.force = 5;
        // 상태
        this.state = 0;

        // 현재 위치
        this.pos = new Point(game.SCREEN_SIZE.x / 2, game.SCREEN_SIZE.y / 2);
        // 임시 위치
        this.velocity = new Point(0, 0);
        // 각도
        this.angle = ut.random(0, Math.PI);

        // 길이
        this.length = 10;
        // 최대 크기
        this.MAXSIZE = 12;
        // 현재 크기
        this.size = 7;

        // 색
        this.mainColor = ut.randomColor();

        // 마디들의 좌표를 담아줄 배열
        this.arr = [];
        // 머리를 배열에 넣어줌
        this.arr.push(
            new Point(game.SCREEN_SIZE.x / 2, game.SCREEN_SIZE.y / 2)
        );
        // 마디들을 배열에 넣어줌
        for (var i = 1; i < this.length; i++) {
            this.arr.push(new Point(this.arr[i - 1].x, this.arr[i - 1].y));
        }
    }

    drawHeadOneEye() {
        var x = this.arr[0].x;
        var y = this.arr[0].y;

        // 머리
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size + 2, 0, 2 * Math.PI);
        this.ctx.fill();

        // 눈 흰자
        this.ctx.fillStyle = "whitesmoke";
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();

        // 눈동자
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size / 1.5, 0, 2 * Math.PI);
        this.ctx.fill();

        // 눈동자 빛 반사
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size / 4, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    drawBody(x, y) {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.mainColor;
        this.ctx.arc(x, y, this.size + 1, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    move() {
        if (!this.state) {
            // x축으로 얼마나 움직어야 하는지
            this.velocity.x = this.force * Math.cos(this.angle);
            // y축으로 얼마나 움직어야 하는지
            this.velocity.y = this.force * Math.sin(this.angle);

            // 모든 마디의 좌표를 바꿔주기
            var d = this.size / 2;
            for (var i = this.length - 1; i >= 1; i--) {
                this.arr[i].x = this.arr[i - 1].x - d * Math.cos(this.angle);
                this.arr[i].y = this.arr[i - 1].y - d * Math.sin(this.angle);

                this.drawBody(this.arr[i].x, this.arr[i].y, i);
            }

            // 현재 뱀의 좌표를 이전 좌표 x, y + 이동 속도로 바꿔주기
            this.pos.x += this.velocity.x;
            this.pos.y += this.velocity.y;

            // 눈 그리기
            this.drawHeadOneEye();

            // 먹이 충돌 판정
            this.checkCollissionFood();

            // 뱀 충돌 판정
            this.checkCollissionSnake();
        }
    }

    checkCollissionFood() {
        // 뱀이 먹이에 닿았는지

        var x = this.arr[0].x;
        var y = this.arr[0].y;

        for (var i = 0; i < game.foods.length; i++) {
            if (ut.cirCollission(x, y, this.size + 3, game.foods[i].pos.x, game.foods[i].pos.y, game.foods[i].size)) {
                game.foods[i].die();
                this.addScore();
                this.incSize();
            }
        }
    }

    checkCollissionSnake() {
        // 뱀이 다른 뱀에 닿았는지

        var x = this.arr[0].x;
        var y = this.arr[0].y;

        // 모든 뱀을 돌며 닿았는지 판정
        for (var i = 0; i < game.snakes.length; i++) {
            var s =  game.snakes[i];
            if(s !== this && !s.state) {
                // j += 2를 하여 시간 탄축
                for (var j = 0; j < game.snakes[i].arr.length; j += 2) {
                    // Util클래스의 cirCollission 메소드를 이용하여 충돌 판정
                    if(ut.cirCollission(x, y, this.size, s.arr[j].x, s.arr[j].y, s.size)) this.die();
                }
            }
        }
    }

    addScore() {
        // 점수 증가

        this.length++;
        this.score++;
        this.arr.push(new Point(-100, -100));
    }

    incSize() {
        // 사이즈 증가

        if (this.length % 30 == 0) this.size++;
        if (this.size > this.MAXSIZE) this.size = this.MAXSIZE;
    }

    changeAngle(angle) {
        // 각도 변경
        this.angle = angle;
    }

    die() {
        // 사망 처리

        this.state = 1;
        // 사망 시 사망 위치에 먹이 생성
        for (var i = 0; i < this.arr.length; i += 3) game.foods.push(new Food(game.ctxFood, this.arr[i].x, this.arr[i].y));
    }
}
