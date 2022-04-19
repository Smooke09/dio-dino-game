const dino = document.querySelector('.dino');
const background = document.querySelector('.background')
let reload = document.querySelector('.reiniciar');
let gameOver = document.querySelector('.game-over');
let isJumping = false;
let position = 0;
let isGameOver = false;



function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            // descendo
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 30;
                    dino.style.bottom = position + 'px';
                }
            }, 20)
        } else {
            // subindo
            position += 30;
            dino.style.bottom = position + 'px';
        }
    }, 15)
}


function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus);

    let leftTimer = setInterval(() => {
        if (cactusPosition <= -60) {
            clearInterval(leftTimer);
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // gameOver
            clearInterval(leftTimer);
            document.body.innerHTML = '';
            isGameOver = true;
            document.body.appendChild(gameOver);
            document.body.appendChild(reload);
            gameOver.classList.add('active');
            gameOver.style.opacity = 1;
            reload.classList.add('active');
            reload.style.opacity = 1;
            document.addEventListener('click', reloadGame);
        } else {

            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }

    }, 20)

    setTimeout(createCactus, randomTime);
}


function reloadGame() {
    location.reload();
}



createCactus();
document.addEventListener('keyup', handleKeyUp)