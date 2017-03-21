var canvas,
    ctx,
    W               	= 340,
    H               	= 600,
    platformLvl 	= 0;

<<<<<<< Updated upstream

var jumper = {
	x: W / 2 - 25, 
	y: H - 70,
	w: 50,
	h: 70,
	gravity: 0.9,
    velocity: 0,
    jumpPower: 16,
    maxJumps: 0,
	floorLimit: H,
	actPlatform: -1,
	update: function(){
		this.velocity += this.gravity;
		this.y += this.velocity;
		if(this.y > this.floorLimit - this.h){
		    this.y = this.floorLimit - this.h; 
		    this.maxJumps = 0;
=======
//Variaveis globais 
var canvas, ctx, canvasHeight, canvasWidth, frame = 0;
 
// Objetos
var floor = {
	y:canvasHeight - 50,
	floorHeight: 50,
	color:"green",
 
	render: function(){
		//Cor do objeto floor
	 	ctx.fillStyle = this.color;
	 	//Desenha objeto floor
	 	ctx.fillRect(0, this.y, canvasWidth, this.floorHeight);
	 }
},
 
jumper = {
	x: canvasWidth/2 - 25,
	y: canvasHeight - 50,
	altura: 70,
	largura: 50,
	cor: "#FF4E4E",
	gravity: .9,
	velocidade: 0,
	forcaDoPulo: 15,
 
	jump: function(){
		this.velocidade =- this.forcaDoPulo;
	},
 
	update: function(){
		this.velocidade += this.gravity;
		this.y += this.velocidade;
			
		//Colisão com chão
		if(this.y > floor.y - this.altura){
			this.y = floor.y - this.altura;
>>>>>>> Stashed changes
		}
	},
	render: function(){
		ctx.fillStyle = "grey";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	},
	jump: function(){
		if(this.maxJumps == 0){
		    this.velocity = - this.jumpPower;
		}
	}
}

var platform = [];
function insertPlatforms(x, y, w, h){
	var minPlatforms = (H / 120) + 1;
	for(i = 0 ; i < minPlatforms ; i++){
		platform.push({
			x: x - w/2,
			oldX: ((x - w/2) - 5) + Math.floor(10 * Math.random()),
			velX: 0,
			y: y - (i * 120),
			oldY: 0,
			w: w,
			h: h,
			st: 0,
			id: i,
			update: function(){
				this.velX = (this.x - this.oldX);
				this.oldX = this.x;
				this.x += this.velX;
				if(this.x + this.w > W - 20){
					this.oldX = this.x + this.velX;
				}else if(this.x <= 20){
					this.oldX = this.x + this.velX;
				}
			},
			render: function(){
				ctx.fillStyle = "black";
				ctx.fillRect(this.x, this.y, this.w, this.h);
			}
		});
	}
}

<<<<<<< Updated upstream
//Recupera evento de clique do mouse
function mouseDown(e){
	jumper.jump();
	jumper.maxJumps = 1;
}

function keyDown(e){
	if(e.keyCode == 32){
		jumper.jump();
		jumper.maxJumps = 1;
	}
=======
 	// 2D para o canvas
	ctx = canvas.getContext("2d");
 
	// adiciona o canvas ao HTML 
	document.body.appendChild(canvas);
 
	// adiciona o evento de mousedown
	document.addEventListener("mousedown", click);
 
	//chama a função loop
	loop();
 
}

//funcao de loop
function loop(){
	//chama a função update
	update();
	//chama a função render
	render();
 
	// a cada segundo a função loop sera chamada
	window.requestAnimationFrame(loop);
>>>>>>> Stashed changes
}

//Atualizações gerais do jogo
function update(){
	for(i = 0 ; i <= platform.length - 1 ; i++){
		platform[i].update();
		if(jumper.y + jumper.h < platform[i].y && jumper.x >= platform[i].x - jumper.w / 3 && jumper.x + jumper.w / 3 <= platform[i].x + platform[i].w && platform[i].st == 0){
			jumper.floorLimit = platform[i].y;
			jumper.actPlatform = i;
			platform[i].st = 1;
		}
		if(jumper.y + jumper.h == platform[i].y){
			jumper.x += platform[i].velX;
		}
		if(jumper.actPlatform == platform[i].id && platform[i].st == 1 && jumper.y + jumper.h == platform[i].y && (jumper.x + jumper.w / 3 < platform[i].x || jumper.x + jumper.w / 3 > platform[i].x + platform[i].w)){
			jumper.floorLimit = H;
		}
	}
	jumper.update();
}

//Renderização dos elementos do jogo
function render(){
	ctx.clearRect(0, 0, W, H);
	for(i = 0 ; i < platform.length ; i++){
		platform[i].render();
	}
	jumper.render();
}

//Cria o loop do jogo
function loop(){
    update();
    render();
	window.requestAnimationFrame(loop);
}

//Função principal - e definições gerais do canvas e contexto
function app(){
    canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    canvas.style.border = "1px solid #F4F4F4";
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    window.canvas.addEventListener('mousedown', mouseDown);
	document.body.addEventListener('keydown', keyDown);
	ctx.translate(0.5, 0.5);
	insertPlatforms(W/2, H - 120, 100, 10);
	loop();
}


app();
