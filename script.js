const mtaWarning = document.getElementById('mtaWarning');
const bubblesContainer = document.getElementById('bubblesContainer');

let mtaOpened = false;

for (let i = 0; i < 35; i++) {
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
    mtaOpened = true;
});

setTimeout(() => {
    window.location.href = 'mtasa://190.102.40.7:22598';
    console.log('Redirecionando para Fluxo Roleplay...');
    setTimeout(() => {
        if (!mtaOpened) {
            mtaWarning.style.display = 'block';
        }
    }, 2000);
}, 5000);