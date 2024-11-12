const comidasFotos = [
    "src/images/foods/food1.png", "src/images/foods/food2.png",
    "src/images/foods/food3.png", "src/images/foods/food4.png",
    "src/images/foods/food5.png", "src/images/foods/food6.png",
    "src/images/foods/food7.png", "src/images/foods/food8.png",
    "src/images/foods/food1.png", "src/images/foods/food2.png",
    "src/images/foods/food3.png", "src/images/foods/food4.png",
    "src/images/foods/food5.png", "src/images/foods/food6.png",
    "src/images/foods/food7.png", "src/images/foods/food8.png",
];

const plantasFotos = [
    "src/images/plants/plant1.png", "src/images/plants/plant2.png",
    "src/images/plants/plant3.png", "src/images/plants/plant4.png",
    "src/images/plants/plant5.png", "src/images/plants/plant6.png",
    "src/images/plants/plant7.png", "src/images/plants/plant8.png",
    "src/images/plants/plant1.png", "src/images/plants/plant2.png",
    "src/images/plants/plant3.png", "src/images/plants/plant4.png",
    "src/images/plants/plant5.png", "src/images/plants/plant6.png",
    "src/images/plants/plant7.png", "src/images/plants/plant8.png",
];

let totalAttempts = 0;
let currentGame = comidasFotos;
let openCards = [];
let matchedCards = [];
let attempts = 0;
let timeLeft = 60;
let timer;

function mostrarImagemCarta(caminhoImagem) {
    return `<img src="${caminhoImagem}" alt="Imagem da carta" class="imagem-carta">`;
}

function setupGame() {
    const gameContainer = document.querySelector(".game");
    gameContainer.innerHTML = "";
    const shuffledFotos = currentGame.slice().sort(() => Math.random() - 0.5);
    
    shuffledFotos.forEach((foto, index) => {
        const box = document.createElement("div");
        box.classList.add("item");
        box.dataset.foto = foto;
        box.dataset.index = index;
        box.onclick = handleClick;
        gameContainer.appendChild(box);
    });
}

function handleClick() {
    if (openCards.length < 2 && !this.classList.contains('boxOpen')) {
        this.classList.add('boxOpen');
        this.innerHTML = mostrarImagemCarta(this.dataset.foto);
        openCards.push(this);
    }
    if (openCards.length === 2) {
        attempts++;
        document.getElementById("attempts").innerText = attempts;
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = openCards;
    
    if (card1.dataset.foto === card2.dataset.foto) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);

        if (matchedCards.length === currentGame.length) {
            clearInterval(timer);
            totalAttempts += attempts; // Soma as tentativas do jogo atual
            if (currentGame === comidasFotos) {
                alert("Parabéns! Você concluiu o jogo de alimentação! Faça escolhas sempre saudáveis, saúde em primeiro lugar.");
                currentGame = plantasFotos;
                document.getElementById("game-title").innerText = "Plantas Medicinais";
                resetGame();  // Reinicia o jogo para o segundo jogo
            } else {
                // Jogo completo com ambos os jogos
                const gameContainer = document.querySelector(".game");
                gameContainer.innerHTML = `
                <div class="loading-container">
                <h2>Você completou os dois jogos com ${totalAttempts} tentativas no total!</h2>
                <p>Parabéns! Agora, siga em frente com escolhas mais saudáveis.</p>
                <div class="spinner">
                
                    <p class="Redirect">Redirecionando para a página de agradecimento...</p>
                        
                        </div>
                    </div>
                `;
                // Redireciona após 5 segundos
                setTimeout(() => {
                    window.location.href = "obrigado.html"; 
                }, 5000);
            }
        }
    } else {
        card1.classList.remove('boxOpen');
        card2.classList.remove('boxOpen');
        card1.innerHTML = "";
        card2.innerHTML = "";
    }

    openCards = [];
}

function startTimer() {
    timer = setInterval(() => {
        document.getElementById("time").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Game Over! O tempo acabou!");
            resetGame();
        }
        timeLeft--;
    }, 1000);
}

function resetGame() {
    timeLeft = 60;
    attempts = 0;
    openCards = [];
    matchedCards = [];
    document.getElementById("time").innerText = timeLeft;
    document.getElementById("attempts").innerText = attempts;
    clearInterval(timer);
    setupGame();
    startTimer();
}

window.onload = () => {
    setupGame();
    startTimer();
};
