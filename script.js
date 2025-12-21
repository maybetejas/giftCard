/* ================= MUSIC ================= */
const music = document.getElementById("bg-music");
music.volume = 0.6;

music.play().catch(() => {
  document.addEventListener(
    "click",
    () => music.play(),
    { once: true }
  );
});

/* ================= INTRO REMOVE ================= */
const intro = document.getElementById("intro");

setTimeout(() => {
  if (!intro) return;

  intro.classList.add("fade-out");

  setTimeout(() => {
    intro.remove(); // remove AFTER fade completes
  }, 1200);

}, 4200);


/* ================= EMOJI CELEBRATION ================= */
const emojiContainer = document.getElementById("emoji-rain");
const emojis = ["🦇", "💖", "✨"];

function spawnEmoji() {
  if (!emojiContainer) return;

  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.animationDuration = 2 + Math.random() * 2 + "s";

  emojiContainer.appendChild(emoji);

  setTimeout(() => emoji.remove(), 4000);
}

const emojiInterval = setInterval(spawnEmoji, 180);

setTimeout(() => {
  clearInterval(emojiInterval);
}, 4000);

/* ================= CARD + 3D ================= */
const card = document.querySelector(".card img");
const MAX_TILT = 22;

/* apply rotation */
let currentX = 0;
let currentY = 0;

function setTilt(rx, ry) {
  currentX += (rx - currentX) * 0.15;
  currentY += (ry - currentY) * 0.15;

  card.style.transform = `
    rotateX(${currentX}deg)
    rotateY(${currentY}deg)
    scale(1.06)
  `;
}


function resetTilt() {
  setTilt(0, 0);
}

/* ================= GYROSCOPE ================= */
function handleOrientation(event) {
  const beta = event.beta;   // front-back
  const gamma = event.gamma; // left-right

  if (beta === null || gamma === null) return;

const rotateX = Math.max(
  -MAX_TILT,
  Math.min(MAX_TILT, -(beta / 45) * MAX_TILT)
);

const rotateY = Math.max(
  -MAX_TILT,
  Math.min(MAX_TILT, (gamma / 25) * MAX_TILT)
);


  setTilt(rotateX, rotateY);
}

function enableMotion() {
  if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
  ) {
    DeviceOrientationEvent.requestPermission().then((state) => {
      if (state === "granted") {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    });
  } else {
    window.addEventListener("deviceorientation", handleOrientation);
  }
}

document.addEventListener("click", enableMotion, { once: true });

/* ================= TOUCH FALLBACK ================= */
card.addEventListener("touchmove", (e) => {
  const rect = card.getBoundingClientRect();
  const touch = e.touches[0];

  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  const rotateY = ((x / rect.width) - 0.5) * MAX_TILT * 2;
  const rotateX = -((y / rect.height) - 0.5) * MAX_TILT * 2;

  setTilt(rotateX, rotateY);
});

card.addEventListener("touchend", resetTilt);

/* ================= DESKTOP MOUSE ================= */
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = ((x / rect.width) - 0.5) * MAX_TILT * 2;
  const rotateX = -((y / rect.height) - 0.5) * MAX_TILT * 2;

  setTilt(rotateX, rotateY);
});

card.addEventListener("mouseleave", resetTilt);
