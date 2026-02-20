const SERVER_NAME = 'Fluxo Roleplay';
const SERVER_IP = '190.102.40.7';
const SERVER_PORT = '22598';
const AUTO_CONNECT_SECONDS = 8;
const CONNECT_URI = `mtasa://${SERVER_IP}:${SERVER_PORT}`;

const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');
const countdownLabel = document.getElementById('countdownLabel');
const mtaWarning = document.getElementById('mtaWarning');
const bubblesContainer = document.getElementById('bubblesContainer');
const connectNowBtn = document.getElementById('connectNowBtn');
const copyAddressBtn = document.getElementById('copyAddressBtn');
const toggleMusicBtn = document.getElementById('toggleMusicBtn');
const bgMusic = document.getElementById('bgMusic');

let mtaOpened = false;
let hasAttemptedOpen = false;
let musicEnabled = true;

const progressStages = [
    'Verificando arquivos do servidor',
    'Sincronizando recursos',
    'Preparando conexão segura',
    'Quase pronto para jogar'
];

for (let i = 0; i < 35; i += 1) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const size = Math.random() * 17 + 8;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${15 + Math.random() * 10}s`;
    bubble.style.animationDelay = `${Math.random() * 5}s`;
    bubble.style.opacity = Math.random() * 0.6 + 0.2;

    bubblesContainer.appendChild(bubble);
}

window.addEventListener('blur', () => {
    if (hasAttemptedOpen) {
        mtaOpened = true;
    }
});

function updateProgress(value) {
    const clamped = Math.max(0, Math.min(100, value));
    const stageIndex = Math.min(progressStages.length - 1, Math.floor(clamped / 25));

    progressBar.style.width = `${clamped}%`;
    progressLabel.textContent = `${progressStages[stageIndex]}... ${clamped}%`;
}

async function copyServerAddress() {
    const address = `${SERVER_IP}:${SERVER_PORT}`;
    try {
        await navigator.clipboard.writeText(address);
        copyAddressBtn.textContent = 'Endereço copiado!';
        setTimeout(() => {
            copyAddressBtn.textContent = 'Copiar endereço';
        }, 1800);
    } catch {
        copyAddressBtn.textContent = address;
    }
}

function showWarningIfMtaDidNotOpen() {
    setTimeout(() => {
        if (!mtaOpened) {
            mtaWarning.style.display = 'block';
        }
    }, 2200);
}

function updateMusicButtonLabel() {
    toggleMusicBtn.textContent = musicEnabled ? '🔊 Música: ligada' : '🔇 Música: desligada';
}

function startMusic() {
    if (!musicEnabled) {
        return;
    }

    bgMusic.volume = 0.35;
    bgMusic.play().catch(() => {
        countdownLabel.textContent = 'Clique em qualquer lugar para iniciar a música';
    });
}

function toggleMusic() {
    musicEnabled = !musicEnabled;

    if (musicEnabled) {
        startMusic();
    } else {
        bgMusic.pause();
    }

    updateMusicButtonLabel();
}

function connectToServer() {
    hasAttemptedOpen = true;
    window.location.href = CONNECT_URI;
    showWarningIfMtaDidNotOpen();
}

function startLoadingScreen() {
    let progress = 0;
    let countdown = AUTO_CONNECT_SECONDS;

    updateProgress(progress);
    countdownLabel.textContent = `Conexão automática em ${countdown}s`;

    const timer = setInterval(() => {
        progress += Math.ceil(Math.random() * 9);
        updateProgress(progress);

        countdown -= 1;
        if (countdown >= 0) {
            countdownLabel.textContent = `Conexão automática em ${countdown}s`;
        }

        if (countdown <= 0 || progress >= 100) {
            clearInterval(timer);
            updateProgress(100);
            countdownLabel.textContent = 'Abrindo o MTA...';
            connectToServer();
        }
    }, 1000);
}

connectNowBtn.addEventListener('click', connectToServer);
copyAddressBtn.addEventListener('click', copyServerAddress);
toggleMusicBtn.addEventListener('click', toggleMusic);

window.addEventListener('click', startMusic, { once: true });
window.addEventListener('keydown', startMusic, { once: true });

document.getElementById('serverName').textContent = SERVER_NAME;
updateMusicButtonLabel();
startMusic();
startLoadingScreen();
