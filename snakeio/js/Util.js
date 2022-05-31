// js/Util.js

class Util{
	constructor(){	
	}

	getMousePos(canvas, e) {
	    // 캔버스에서 마우스 위치를 반환하는 함수
        
		var rect = canvas.getBoundingClientRect();
	    var marginTop = canvas.style.marginTop;

	    var x = e.clientX - rect.left;
	    var y = e.clientY - rect.top - marginTop;
    
	    return new Point(x, y);	    
	}

	random(min, max){  
        // 랜덤한 값을 반환하는 함수
        return Math.floor(Math.random() * (max - min + 1)) + min;	
	}

	randomColor(){	
		// 랜덤한 색을 반환하는 함수
        var colors = [
            "#C0392B", "#E74C3C", "#9B59B6",
            "#8E44AD", "#2980B9", "#3498DB",
            "#17A589", "#138D75", "#229954",
            "#28B463", "#D4AC0D", "#D68910",
            "#CA6F1E", "#BA4A00"
        ];
        return colors[this.random(0, colors.length - 1)];
	}

	randomName(){
		// 랜덤한 이름을 반환하는 함수
        var names = ['Swift', 'Typescript', 'C++', 'Java', 'Python', 'Javascript', 'C', 'Go',
		'Rust', 'Kotlin', 'C#'];
		return names[this.random(0, names.length-1)]
	}

	getDistance(s1, s2){
		// 두 뱀 사이의 거리를 반환하는 함수
        return Math.abs(Math.sqrt(Math.pow((s2.x - s1.x), 2) + Math.pow((s2.y - s1.y), 2)));
	}

	getAngle(p1, p2){		
		// 뱀의 머리와 마우스 사이의 각도를 반환하는 함수
		
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    }

    cirCollission(x1, y1, r1, x2, y2, r2){
    	// 두 원의 충돌을 확인하여 반환하는 함수
        return (this.getDistance(new Point(x1, y1), new Point(x2, y2)) < (r1 + r2));
    }

    rotate(p, c, angle){
    	// 회전한 좌표를 반환하는 함수
    }

}