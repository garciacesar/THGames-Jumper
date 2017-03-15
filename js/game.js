// pega a largura total da tela
canvasWidth = window.innerHeight;
// pega a altura total da tela 
canvasHeight = window.innerWidth;
 
//gera a tela do iphone para browsers
if (canvasWidth >= 375){
	canvasWidth = 375;
	canvasHeight = 660;
}

//VARIÁVEIS GLOBAIS DO JOGO 
var canvas, ctx, canvasHeight, canvasWidth, frame = 0;
 
// OBJETOS DO JOGO 
var floor={
	y:canvasHeight - 50,
	floorHeight: 50,
	color:"green",
 
	render: function(){
	 	ctx.fillStyle = this.color;
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
			
		//COLISÃO COM O CHÃO 
		if(this.y > floor.y - this.altura){
			this.y = floor.y - this.altura;
		}
	},
 
	render:function(){
		ctx.fillStyle = this.cor;
	 	ctx.fillRect(this.x, this.y, this.largura, this.altura);
	}
};
 
// Irá contar o cliks e fazer o personagem pular
function click(e){
	jumper.jump();
}

// função principal onde será chamada as outras funções (contrutor)
function game(){
	// criação de um novo elemento do tipo canvas, é como se eu escrevesse a tag canvas no html
	canvas = document.createElement("canvas");
	//define a largura do canvas 
	canvas.width = canvasWidth;
	//define a altura do canvas
	canvas.height = canvasHeight;
	//Stilo do canvas
 	canvas.style.border = "1px solid #000";
 	canvas.style.top = "0px";
 	canvas.style.bottom = "0px";
 	canvas.style.left = "0px";
 	canvas.style.right = "0px";
 	canvas.style.margin = "auto";
 	canvas.style.position = "absolute";

 	// pegar o contexto 2D para o canvas, isso quer dizer que tudo quer for renderizado será do contexto 2D 
	ctx = canvas.getContext("2d");
 
	// adiciona o canvas ao nosso documento HTML 
	document.body.appendChild(canvas);
 
	// adiciona o evento de click, toda vez que alguém cliar na pagina será executado a função "click" que criamos anteriormente, o evento será pasado por parametro 
	document.addEventListener("mousedown", click);
 
	//chama a função loop
	loop();
 
}

//responsável por fazer a 
function loop() {
	//chama a função update
	update();
	//chama a função render
	render();
 
	// a cada segundo a função loop sera chamada
	window.requestAnimationFrame(loop);
}

function update(){
	//incrementa mais 1 ao nosso frame
	frame ++;
	jumper.update();
}

function render(){
	// define a cor do retangulo que queremos dezenhar 
	ctx.fillStyle = "#50BEff";
	// render um retangulo da x = 0 até o tamanho total da largura
	//e de y =  0 até o tamanho total da altura
	ctx.fillRect(0,0, canvasWidth, canvasHeight)
 
	floor.render();
	jumper.render();
}
 
// incia o jogo 
game();