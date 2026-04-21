const startScreen = document.getElementById("start-screen");
const storyScreen = document.getElementById("story-screen");
const startButton = document.getElementById("start-button");
const slide = document.getElementById("slide");
const slideImage = document.getElementById("slide-image");
const slideText = document.getElementById("slide-text");
const finalEffects = document.getElementById("final-effects");
const music = document.getElementById("bg-music");

const TRANSITION_MS = 550;

const slides = [
  {
    image: null,
    text: "us. 💗\none year already?? 🥺",
    duration: 2600,
    kind: "opening"
  },
  {
    image: "1.jpeg",
    text: "remember when we first met…\nin the basement… we boom boom 😭💗\nyeah it started like THAT",
    duration: 2300
  },
  {
    image: "2.jpeg",
    text: "our first anniversary 🥺🍣\nwe had sushi…\ni dressed like an idiot\nand you looked like a literal goddess 💖✨",
    duration: 2400
  },
  {
    image: "3.jpeg",
    text: "this anniversary… just us in the park 🌿💗\ngetting bitten by mosquitoes 😭\nkinda sad… but still us",
    duration: 2400
  },
  {
    image: null,
    text: "YOU WERE IN RUSSIA…\nso we didn't get to celebrate our anniversary 💔\nbut you were coming back…\nand i missed you so much 🥺",
    duration: 3700,
    kind: "drop"
  },
  {
    image: "4.jpeg",
    text: "and then you came back like—\n\"bitch you better girl mode 😭💅\"\n\"i want a girlfriend not a boyfriend\"\nand you helped me find myself again 💗",
    duration: 2700
  },
  {
    image: "5.jpeg",
    text: "we boom boomed at my house 💀💗\nthen went to toons for burgers\nlowkey ass burgers…\nbut nothing is ass when i'm with you 😭💕",
    duration: 2400
  },
  {
    image: "6.jpeg",
    text: "just us in the mall…\nsitting in that shady elevator corner 😭\ni love these random little moments with you 🫶",
    duration: 2300
  },
  {
    image: "7.jpeg",
    text: "this year started with a bang 💖✨\nme and my baby all dressed up\nsissy spin energy 💅🌸\nflowers… vibes… everything felt perfect",
    duration: 2400
  },
  {
    image: "8.jpeg",
    text: "and this is you on my birthday 🎂💗\nyou always take care of me\nyou're literally the best girlfriend ever 🥺💖",
    duration: 2400
  },
  {
    image: null,
    text: "happy 1 year anniversary baby 💕🎀\ni love you so much\n\nto be continued…\nfor as long as we're alive 💗✨",
    duration: null,
    kind: "final"
  }
];

let index = 0;
let started = false;
let finalParticlesInterval = null;

function renderSlide(data) {
  slide.classList.remove("has-image", "no-image", "final");

  if (data.image) {
    slideImage.classList.remove("hidden");
    slideImage.src = data.image;
    slideImage.alt = "Memory photo";
    slideImage.style.animation = "none";
    void slideImage.offsetWidth;
    slideImage.style.setProperty("--zoom-duration", `${data.duration || 2600}ms`);
    slideImage.style.animation = "";
    slide.classList.add("has-image");
  } else {
    slideImage.classList.add("hidden");
    slideImage.removeAttribute("src");
    slideImage.alt = "";
    slide.classList.add("no-image");
  }

  if (data.kind === "final") {
    slide.classList.add("final");
    startFinalEffects();
  } else {
    stopFinalEffects();
  }

  slideText.textContent = data.text;
}

function stepStory() {
  const data = slides[index];
  renderSlide(data);

  if (data.duration == null) {
    return;
  }

  setTimeout(() => {
    slide.classList.add("is-fading");

    setTimeout(() => {
      slide.classList.remove("is-fading");
      index += 1;
      stepStory();
    }, TRANSITION_MS);
  }, data.duration);
}

function spawnParticle() {
  const symbols = ["💖", "✨", "💗", "🎀"];
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${3 + Math.random() * 2.5}s`;
  finalEffects.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 6000);
}

function startFinalEffects() {
  finalEffects.classList.remove("hidden");
  if (finalParticlesInterval) {
    return;
  }

  finalParticlesInterval = setInterval(spawnParticle, 280);
}

function stopFinalEffects() {
  finalEffects.classList.add("hidden");
  if (finalParticlesInterval) {
    clearInterval(finalParticlesInterval);
    finalParticlesInterval = null;
  }
  finalEffects.innerHTML = "";
}

function startExperience() {
  if (started) {
    return;
  }

  started = true;
  startScreen.classList.add("hidden");
  storyScreen.classList.remove("hidden");

  music.currentTime = 0;
  music.loop = false;
  music.volume = 0.8;
  music.play().catch(() => {
  });

  stepStory();
}

startButton.addEventListener("click", startExperience);
