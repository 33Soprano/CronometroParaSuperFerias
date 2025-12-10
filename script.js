// Target Date: 18/12/2025 18:00:00
const targetDate = new Date('2025-12-18T18:00:00').getTime();

const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display result
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // If the count down is finished
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("timer").style.display = "none";
        document.querySelector("h1").innerText = "Chegou a hora!";
        revealSurprise();
    }
}, 1000);

function revealSurprise() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.classList.remove('hidden');

    // Small delay to allow display:block to apply before adding visible class for opacity transition
    setTimeout(() => {
        cardContainer.classList.add('visible');
    }, 100);
}

// Card Click Interaction
document.querySelector('.card').addEventListener('click', function () {
    this.classList.toggle('flipped');
});

// Floating Surprises Logic
const popupModal = document.getElementById('popup-modal');
const icons = ['🎁', '✨', '🎈', '💖'];

function createFloatingGift() {
    const gift = document.createElement('div');
    gift.classList.add('floating-gift');
    gift.innerText = icons[Math.floor(Math.random() * icons.length)];

    // Random Position
    const startLeft = Math.random() * 90 + 5; // 5% to 95% width
    gift.style.left = startLeft + 'vw';

    // Random Animation Duration
    const duration = Math.random() * 5 + 5; // 5-10s
    gift.style.animationDuration = duration + 's';

    // Click Event
    gift.addEventListener('click', () => {
        showPopup();
        gift.remove(); // Remove after clicking
    });

    document.body.appendChild(gift);

    // Remove when animation ends
    setTimeout(() => {
        if (gift.parentNode) gift.remove();
    }, duration * 1000);
}

const surpriseImages = ['surprise.jpg', 'surprise2.jpg', 'surprise3.jpg'];

function showPopup() {
    const popupImg = document.querySelector('.popup-content img');
    const randomImage = surpriseImages[Math.floor(Math.random() * surpriseImages.length)];
    popupImg.src = randomImage;

    popupModal.classList.add('active');
    setTimeout(() => {
        popupModal.classList.remove('active');
    }, 3000); // Show for 3 seconds
}

// Spawn gifts every 2 seconds
setInterval(createFloatingGift, 2000);

// Close popup on click (optional immediate close)
popupModal.addEventListener('click', () => {
    popupModal.classList.remove('active');
});

