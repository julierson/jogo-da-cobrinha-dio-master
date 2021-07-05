// Carregando o snake com uma variável chamada "canvas".
let canvas = document.getElementById('snake');

// Contexto é a reinderização do Canvas que vai trabalhar com um plano 2D.
let context = canvas.getContext('2d'); 

// 32 pixels cada quadrado.
let box = 32;
let snake = []; // Criando um array.

// Passando o que vai ter dentro do array.
snake[0] = { // Definindo a posição.
    x: 8 * box, // Dando um tamanho.
    y: 8 * box
}

// Variável responsável pela a direção.
let direction = "right";

let food = {
    x: Math.floor(Math.random() * 13 + 1) * box,
    y: Math.floor(Math.random() * 13 + 1) * box
}

function criarBG(){

    var img = new Image();
    img.src="../img/fundo.png";
    var pat = context.createPattern(img, 'repeat');

    // Definindo a cor. | fillstyle trabalha com o estilo do canvas.
    context.fillStyle = pat;

    // Desenha onde vai acontecer o jogo e trabalha com 4 parâmetros.
    context.fillRect(0, 0, 600, 530);
}

function criarCobrinha(){
    // for vai percorrer todo o tamanho do array e vai incrementar.
    for(i=0; i < snake.length; i++){

        // Definindo a cor.
        context.fillStyle = "#578a34";

        // Passando o tamanho.
        context.fillRect(snake[i].x - 5, snake[i].y - 6, 30, 30);
    }
} 

// Função responsável pela a criação da comida.
function drawFood(){
    // Definindo a cor da comida.
    context.fillStyle = "red";
    // Passando as posições quando o fillRect ir desenhar.
    context.fillRect(food.x - 5, food.y -6 , box, box)
}

// Evento de clique vai pegar a tecla e dar update.
document.addEventListener('keydown', update);

// Informando o código da tecla e criando a regra que não pode ser na direção oposta.
function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Função que inicia um novo jogo
function reset(){
    clearInterval(jogo);
    document.location.reload(true);
}

// Função que carrega partes do jogo.
function iniciarJogo(){

    for(i = 1; i < snake.length; i++){

        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('UP, QUE PENA VOCÊ PERDEU!');
        }
    }

    if(snake[0].x > 18 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 18 * box;
    if(snake[0].y > 16 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    // Carrega as funções.
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){

        // Retirando o último elemento do array.
        snake.pop();

    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        $('#placar').text(' Placar: ' + snake.length);
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Unshift - Acrescentando um elemento sempre na frente.
    snake.unshift(newHead);
}

// A cada 100 milisegundos o iniciarJogo vai estar sendo renovado caso trave. 
let jogo = setInterval(iniciarJogo, 200);