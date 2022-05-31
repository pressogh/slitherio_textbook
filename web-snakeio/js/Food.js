// js/Food.js

class Food {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        // 위치
        this.pos = new Point(x, y);
        // 최소 크기
        this.sizeMin = 2;
        // 최대 크기
        this.sizeMax = 5;
        // 색
        this.mainColor = ut.randomColor();
        // 크기
        this.size = ut.random(this.sizeMin, this.sizeMax);
        // 상태
        this.state = 0;
    }

    draw(player) {
        // 먹이를 화면에 그려주는 함수
        
        this.pos.x -= player.velocity.x;
        this.pos.y -= player.velocity.y;

        var x = parseInt(this.pos.x);
        var y = parseInt(this.pos.y);

        this.ctx.fillStyle = this.mainColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    die() {
        // 사망 처리

        this.state = 1;
        var index = game.foods.indexOf(this);
        game.foods.splice(index, 1);
    }
}
