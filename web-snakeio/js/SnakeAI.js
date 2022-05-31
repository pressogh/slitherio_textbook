class SnakeAI extends Snake {
	constructor(ctx, name, id) {
		super(ctx, name, id);

        // 속도
		this.force = 2;
        // 위치
		this.pos = new Point(ut.random(-6000, 1800), ut.random(-300, 900));
        // 길이
		this.length = ut.random(10, 50);
		
        // 마디를 저장할 배열
		this.arr = [];

        // 머리와 마디 삽입
		this.arr.push(this.pos);
		for(var i = 1; i < this.length; i++) {
            this.arr.push(new Point(this.arr[i - 1].x, this.arr[i - 1].y));
        }

        // AI뱀 움직임 시작
		this.initAiMovement();
	}

	initAiMovement() {
		// 랜덤하게 움직이도록
		var self = this;

		var count = 0;
		var units = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
		var unit = 0.5;		
		self.timer = setInterval(function() {
			if(count > 20){
				unit = units[ut.random(0, units.length - 1)];
			} 
			else if(count > 10) self.angle += unit;
			else if(count > 0) self.angle -= unit;

			count++;
			count %= 30;
		
		}, 100);
	}

	move(player) {

		if (!this.state) {
			// 움직임 처리

			this.velocity.x = this.force * Math.cos(this.angle);
			this.velocity.y = this.force * Math.sin(this.angle);

			for (var i = this.length - 1; i >= 1; i--) {
				this.arr[i].x = this.arr[i - 1].x;
				this.arr[i].y = this.arr[i - 1].y;

				// 모든 마디가 사용자 뱀과 상관 없이 움직이도록
				this.arr[i].x -= player.velocity.x;
				this.arr[i].y -= player.velocity.y;

				// 마디를 그려줌
				this.drawBody(this.arr[i].x, this.arr[i].y, i);
			}

			// 모든 마디가 사용자 뱀과 상관 없이 움직이도록
			this.arr[0].x += this.velocity.x;
			this.arr[0].y += this.velocity.y;

			this.pos.x += this.velocity.x;
			this.pos.y += this.velocity.y;

			this.arr[0].x -= player.velocity.x;
			this.arr[0].y -= player.velocity.y;

			// 머리를 그려줌
			super.drawHeadOneEye();

			// 먹이 충돌판정
			super.checkCollissionFood();

			// 맵 경계 충돌판정
			this.checkBoundary();

			// 뱀 충돌판정
			this.checkCollissionSnake()
		}
	}

	checkBoundary() {
		// 맵 경계 판정

		//left
		if(this.arr[0].x < game.world.x) this.arr[0].x = game.world.x + game.WORLD_SIZE.x;

		//right
		else if(this.arr[0].x > game.world.x + game.WORLD_SIZE.x) this.arr[0].x = game.world.x;

		//up
		if(this.arr[0].y < game.world.y) this.arr[0].y = game.world.y + game.WORLD_SIZE.y;

		//down
		else if(this.arr[0].y > game.world.y + game.WORLD_SIZE.y) this.arr[0].y = game.world.y;
	}

	checkCollissionSnake() {
        super.checkCollissionSnake();
	}
}