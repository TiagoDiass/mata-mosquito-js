let windowHeight = 0;
let windowWidth = 0;
let gameArea = document.querySelector('body');
let time =  30;

//Váriavel que usaremos para concatenar a string que troca o coração de cheio pra vazio
let lifeNumber = 3;

//String que representa o nível de dificuldade que pegaremos a partir da URL
let difficultyLevelString = window.location.search;
difficultyLevelString = difficultyLevelString.replace('?', '');

//Configurando o tempo em ms do nosso setInterval a partir do nível de dificuldade
function settingLevel(difficultyLevelString){
    let difficultyLevel;
    switch(difficultyLevelString){
        case 'normalLevel':
            difficultyLevel = 1700;
            break;
        case 'hardLevel':
            difficultyLevel = 1200;
            break;
        case 'johnWickLevel':
            difficultyLevel = 750;
            break;
    }
    return difficultyLevel;
}

//Váriavel receberá o tempo em ms da respective dificuldade
let difficultyLevel = settingLevel(difficultyLevelString);

//Função para criar elementos de forma mais simples
function createElement(tagName, className){
    const element = document.createElement(tagName);
    element.className = className;

    return element;
} 

//Cronômetro
let timer = setInterval(function() {
    
    if(time == 0){
        victory();
    }else{
        document.getElementById('timeLeft').innerHTML = time;
        time--;
    }
}, 1000);

//Função para o jogo funcionar somente com o espaço de tela disponível
function adjustGameArea(){
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    // console.log(windowWidth, windowHeight);
}

adjustGameArea();

//Função que cria o mosquito
function setRandomMosquito(){
    
    //TEMOS QUE REMOVER O MOSQUITO ANTERIOR CASO ELE EXISTA
    //E ALÉM DISSO, AQUI É ONDE MANIPULAREMOS AS VIDAS DO JOGADOR
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove();
        
        //Se já for menor que 1, é porque temos GameOver
        if(lifeNumber < 1){
            gameOver();
        }else{
            document.getElementById(`life${lifeNumber}`).src = 'imagens/coracao_vazio.png';
            lifeNumber--;
        }
    }
    
    let xPosition = Math.floor(Math.random() * windowWidth) - 100;
    let yPosition = Math.floor(Math.random() * windowHeight) - 100;

    // console.log(xPosition, yPosition);

    xPosition = xPosition < 0 ? 0 : xPosition;
    yPosition = yPosition < 0 ? 0 : yPosition;

    let mosquitoClass = setRandomSize();
    let mosquitoSide = setRandomSide();

    let mosquito = createElement('img', mosquitoClass);
    mosquito.src = 'imagens/mosquito.png';
    
    //Posição do mosquito
    mosquito.style.left = `${xPosition}px`;
    mosquito.style.top = `${yPosition}px`;
    mosquito.style.position = 'absolute';

    //Lado A ou lado B, olhando pra esquerda ou pra direita
    mosquito.style.transform = `scaleX(${mosquitoSide})`;

    //Atribuindo um ID ao mosquito para que tenhamos somente um por vez na tela
    mosquito.id = 'mosquito';

    //Removendo o elemento quando ele é clicado
    mosquito.onclick = function(){
        this.remove();
    }

    gameArea.appendChild(mosquito);

}

//Função para fazer o tamanho do mosquito ser aleatório
function setRandomSize(){
    //Através da váriaval mosquitoSizeClass, obteremos um valor exato, 0, 1 ou 2, e com isso
    //definiremos a classe do tamanho do mosquito, através das classes css
    let mosquitoSizeClass = Math.floor(Math.random() * 3);
    
    //Variável que receberá a string que usaremos como classe css do mosquito
    let mosquitoClass;

    //Verificando a classe do tamanho do mosquito
    switch(mosquitoSizeClass){
        case 0:
            mosquitoClass = 'mosquito1';
            break;
        case 1:
            mosquitoClass = 'mosquito2';
            break;
        case 2:
            mosquitoClass = 'mosquito3';
            break;
    }

    //CLASSE CSS DO MOSQUITO
    return mosquitoClass;
}

//Função para fazer o lado que o mosquito olha ser aleatório
function setRandomSide(){
    //Função para fazer o lado do mosquito ser aleatório
    //Isso é, olhando para a esquerda, ou para a direita.
    //Isso retornará um valor inteiro 0, ou 1, e assim definiremos a propriedade transform scaleX do mosquito;
    let mosquitoSide = Math.floor(Math.random() * 2);
    
    if(mosquitoSide == 0){
        mosquitoSide = 1;
    }else{
        mosquitoSide = -1;
    }

    return mosquitoSide;
}

//Função para utilizar no GameOver, redirecionaremos o usuário para outra página
function gameOver(){
    window.location.href = `gameOver.html?${difficultyLevelString}`;
}

//Função para utilizar quando o usuário vencer, redirecionaremos ele para outra página
function victory(){
    window.location.href = `victory.html?${difficultyLevelString}`;
}

setInterval(function (){
    setRandomMosquito();
}, difficultyLevel);


