const audio = document.getElementById("bgAudio");
let confettiStarted = false;

function playSurprise() {
  audio.play().catch(err => console.log("Playback prevented:", err));
  if (!confettiStarted) {
    startConfetti();
    confettiStarted = true;
  }
}

function startConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = [];
  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: 8,
      h: 8,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 2 * Math.PI
    });
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of pieces) {
      p.y += p.speed;
      p.x += Math.sin(p.angle);
      if (p.y > canvas.height) p.y = -10;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.w, p.h);
    }
    requestAnimationFrame(update);
  }

  update();
}
