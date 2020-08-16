class Game {
	init() {
		this.list1 = JSON.parse(localStorage.getItem('arr'))
		this.ul = document.querySelector('.rank-list')
		if(this.list1) {
			for(let i = 0; i < this.list1.length; i++) {
				this.createListItem(i, this.list1[i], this.ul)
			}
		}
		
		this.map = document.querySelector('#game');
		this.bird = document.querySelector('.bird');
		this.start = document.querySelector('.start');
		this.score1 = document.querySelector('.score');
		this.mask = document.querySelector('.mask');
		this.end = document.querySelector('.end');
		this.zhu = document.querySelector('.zhu');
		// this.zhuzi = document.querySelectorAll('.zhuzi');
		this.restart = document.querySelector('.restart');
		this.eScore = document.querySelector('.e-score');
		this.rScore = document.querySelector('.rank-score')
		
		this.bgx = 1;
		this.birdy = 50; 
		this.birdBoo = true 
		this.time;
		this.time1;
		this.time2;
		this.time3;
		this.time4;
		this.zhuZi = []
		this.game = false;
		this.birdWeizhi = 300;
		this.mapMoveTime = 50;
		this.height = [
			{th: 100, bh: 400},
			{th: 150, bh: 350},
			{th: 200, bh: 300},
			{th: 250, bh: 250},
			{th: 300, bh: 200},
			{th: 350, bh: 150},
			{th: 400, bh: 100},
		];
		this.width = 300;
		this.zhuInit()
		this.mapMove()
		this.birdMove()
		this.startMove()
		this.i = 0;
		this.score = 0;
		this.restart.onclick = this.replay.bind(this)
		this.start.onclick = this.play.bind(this)
	}
	play() {
		this.zhu.style.display = 'block'

		this.mapMoveTime = 20
		this.game = true;
		this.score1.style.display = 'block'
		clearInterval(this.time)
		this.mapMove()
		this.dump()
		clearInterval(this.time1)
		clearInterval(this.time2)
		this.map.onclick = this.birdDump.bind(this)
		this.start.style.display = 'none'
		this.bird.style.left = 20 + 'px'
		this.create()
	}
	replay() {
		// this.game = true;
		// this.birdWeizhi = 300;
		this.score1.innerHTML = 0
		this.zhu.innerHTML = ''
		this.zhuZi = []
		this.zhuInit();
		this.bgx = 1;
		this.game = false;
		this.birdWeizhi = 300;
		this.mapMoveTime = 20;
		this.width = 300;
		this.score = 0;
		this.mask.style.display = 'none'
		this.end.style.display = 'none'
		clearInterval(this.time)
		clearInterval(this.time1)
		clearInterval(this.time2)
		clearInterval(this.time3)
		clearInterval(this.time4)
		this.mapMove();
		this.dump();
		this.create()
		this.map.onclick = this.birdDump.bind(this)
	
	}
	mapMove() {
		this.time = setInterval(() => {
			this.bgx++;
			if(this.bgx % 300 == 0 && this.game) {
				this.create()
			}
			this.map.style.backgroundPositionX = -this.bgx + 'px'
		},this.mapMoveTime)
	}
	birdDump() {
		this.birdWeizhi -= 50;
		this.bird.style.backgroundImage = 'url(./birds.png)';
		this.bird.style.backgroundPositionX = 30 + 'px'

		setInterval(() => {
			this.bird.style.background = 'url(./bird.png)';
		},1000)
	}
	birdMove() {
		this.time1 = setInterval(() => {
			if(this.birdBoo) {
				this.birdy--
				if(this.birdy <= 10) {
					this.birdBoo = false
				}
			}else{
				this.birdy++
				if(this.birdy >= 90) {
					this.birdBoo = true
				}
			}
			this.bird.style.transform = 'translate(-50% ,-'+ this.birdy + '% )'
		},10)
	}
	startMove() {
		this.time2 = setInterval(() => {
			
			if(this.i % 2 == 0) {
				this.start.className = 'start start-blue'
			}else {
				this.start.className = 'start start-while'
			}
			this.i++
		},300)
	}
	dump() {
		this.time3 = setInterval(() => {
			this.birdWeizhi++
			this.bird.style.top =  this.birdWeizhi + 'px'
			// console.log(this.bgx)
			// console.log(290 * i)
			let zl = parseInt(this.zhu.children[0].style.left)
			if(zl <= 35 && zl >= -120) {
				// console.log(this.bgx)
				let th = parseInt(this.zhu.children[0].children[0].style.height)
				let bh = 600 - parseInt(this.zhu.children[0].children[1].style.height)
				if(this.birdWeizhi <= (th - 30) || this.birdWeizhi >= (bh + 30)) {
					this.over()
				}
				// console.log(this.birdWeizhi)
			}
			if(this.birdWeizhi >= 600) {
				this.over();
			}else if(this.birdWeizhi <= 0) {
				this.over();
			}
			// console.log(this.bgx)
		},20)
	}
	over() {
		clearInterval(this.time1)
		clearInterval(this.time)
		clearInterval(this.time2)
		clearInterval(this.time3)
		clearInterval(this.time4)
		let sArr = []

		let name = window.prompt("请输入名字")
		let storage = {
			name: name,
			score: this.score
		}
		if(this.list1) {
			this.list1.push(storage)
			localStorage.setItem('arr', JSON.stringify(this.list1))
		}else {
			sArr.push(storage)
			localStorage.setItem('arr', JSON.stringify(sArr))
		}
		
		
		this.ul.innerHTML = ''
		this.list1 = JSON.parse(localStorage.getItem('arr'))
		this.list1.sort((item1, item2) => item2.score - item1.score)
		this.list1.length = 10;
		for(let i = 0; i < this.list1.length; i++) {
			
			this.createListItem(i, this.list1[i], this.ul)
		}

		this.eScore.innerHTML = this.score
		this.game = false
		this.map.onclick = null;
		this.end.style.display = 'block'
		this.mask.style.display = 'block'
	}
	create() {
		this.time4 = setInterval(() => {
			if(this.zhuZi[0] <= -90 && this.zhu.children.length > 3) {
				this.zhu.children[0].remove()
				this.zhuZi.shift()
				this.score ++;
				this.score1.innerHTML = this.score
			}
			for(let i = 0; i < this.zhu.children.length; i++)  {
				this.zhuZi[i] = --this.zhuZi[i]

				if(this.zhuZi[0] <= 200 && this.zhu.children.length <= 4) {
					let random1 = Math.floor(Math.random() * 8);
					let zhuzi = document.createElement('div')
					zhuzi.setAttribute('class','zhuzi');
					zhuzi.style.left = 5 * this.width + 'px';
					this.zhuZi.push(5 * this.width)
					let zhuTop = document.createElement('div');
					let zhuBottom = document.createElement('div');
					zhuTop.setAttribute('class','zhu-top')
					zhuTop.style.height = this.height[random1].th + 'px'
					zhuBottom.setAttribute('class','zhu-bottom')
					zhuBottom.style.height = this.height[random1].bh + 'px'
					zhuzi.appendChild(zhuTop) 
					zhuzi.appendChild(zhuBottom) 

					this.zhu.appendChild(zhuzi)
				}
				// console.log(this.zhuZi)
				this.zhu.children[i].style.left = this.zhuZi[i] + 'px'
			}
				// console.log(this.zhu.children[i])
		
			
			// console.log(this.zhu.children.length)
			
		},20)
		// this.zhuzi[0].remove()
		// this.zhuzi[1].remove()
		// let top = document.createElement('li');
		// top.setAttribute('zhu-item top')

		// this.zhu.appendChild(top)
	}
	zhuInit() {
		for(let i = 1; i <= 4; i++) {
			let random1 = Math.floor(Math.random() * 8);
			let zhuzi = document.createElement('div')
			zhuzi.setAttribute('class','zhuzi');
			zhuzi.style.left = i * this.width + 'px';
			this.zhuZi.push(i * this.width)
			let zhuTop = document.createElement('div');
			let zhuBottom = document.createElement('div');
			zhuTop.setAttribute('class','zhu-top')
			zhuTop.style.height = this.height[random1].th + 'px'
			zhuBottom.setAttribute('class','zhu-bottom')
			zhuBottom.style.height = this.height[random1].bh + 'px'
			zhuzi.appendChild(zhuTop) 
			zhuzi.appendChild(zhuBottom) 

			this.zhu.appendChild(zhuzi)
		}
	}
	createListItem(i, item, ul) {
		// <li class="rank-item">
		// 			<span class="rank-degree">1</span>
		// 			<span class="rank-score">5</span>
		// 			<span class="rank-title">2020.08.15 20:20:20</span>
		// 		</li>
		// console.log(this.ul)
		let li = document.createElement('li')
		li.setAttribute('class', 'rank-item');
		let lic1 = document.createElement('span');
		lic1.setAttribute('class', 'rank-degree');
		lic1.innerHTML = ++i
		let lic2 = document.createElement('span');
		lic2.setAttribute('class', 'rank-score');
		lic2.innerHTML = item.score
		let lic3 = document.createElement('span');
		lic3.setAttribute('class', 'rank-title');
		lic3.innerHTML = item.name
		li.appendChild(lic1)
		li.appendChild(lic2)
		li.appendChild(lic3)
		ul.appendChild(li)

	}
}
let game = new Game()
game.init()