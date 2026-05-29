const navToggle = document.querySelector("#navToggle");
const mainNav = document.querySelector("#mainNav");
const typewriter = document.querySelector("#typewriter");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navToggle.innerHTML = isOpen ? '<i class="bx bx-x"></i>' : '<i class="bx bx-menu"></i>';
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-label", "Open navigation");
    navToggle.innerHTML = '<i class="bx bx-menu"></i>';
  });
});

const footerText = document.querySelector("footer p");
if (footerText) {
  footerText.textContent = "\u00a9 2026 Varun Shivaram. Built with a light cosmic portfolio system.";
}

const introLines = [
  "Hi, I am Varun Shivaram.",
  "I build full-stack products.",
  "I explore cloud, Linux, and agentic AI.",
];

let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function runTypewriter() {
  if (!typewriter) return;

  const currentLine = introLines[lineIndex];
  typewriter.textContent = currentLine.slice(0, charIndex);

  if (!deleting && charIndex < currentLine.length) {
    charIndex += 1;
    setTimeout(runTypewriter, 58);
    return;
  }

  if (!deleting && charIndex === currentLine.length) {
    deleting = true;
    setTimeout(runTypewriter, 1300);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(runTypewriter, 30);
    return;
  }

  deleting = false;
  lineIndex = (lineIndex + 1) % introLines.length;
  setTimeout(runTypewriter, 320);
}

runTypewriter();

const canvas = document.querySelector("#spaceCanvas");
const context = canvas.getContext("2d");
let stars = [];
let dust = [];
let width = 0;
let height = 0;

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const starCount = Math.min(130, Math.max(58, Math.floor(width / 10)));
  stars = Array.from({ length: starCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.35 + 0.25,
    alpha: Math.random() * 0.45 + 0.18,
    pulse: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.12 + 0.035,
  }));

  const centerX = width * 0.7;
  const centerY = height * 0.22;
  dust = Array.from({ length: 70 }, () => ({
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * Math.min(width, height) * 0.22 + 42,
    speed: Math.random() * 0.004 + 0.0015,
    width: Math.random() * 1.8 + 0.5,
    centerX,
    centerY,
  }));
}

function drawSpace() {
  context.clearRect(0, 0, width, height);

  const galaxyX = width * 0.72;
  const galaxyY = height * 0.2;
  const galaxyRadius = Math.min(width, height) * 0.34;

  const glow = context.createRadialGradient(galaxyX, galaxyY, 0, galaxyX, galaxyY, galaxyRadius);
  glow.addColorStop(0, "rgba(37, 36, 38, 0.22)");
  glow.addColorStop(0.14, "rgba(85, 64, 175, 0.16)");
  glow.addColorStop(0.34, "rgba(249, 231, 28, 0.11)");
  glow.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  stars.forEach((star) => {
    star.y += star.speed;
    star.pulse += 0.018;

    if (star.y > height + 8) {
      star.y = -8;
      star.x = Math.random() * width;
    }

    const alpha = star.alpha + Math.sin(star.pulse) * 0.16;
    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = `rgba(85, 64, 175, ${alpha})`;
    context.fill();
  });

  dust.forEach((grain) => {
    grain.angle += grain.speed;
    const x = grain.centerX + Math.cos(grain.angle) * grain.radius;
    const y = grain.centerY + Math.sin(grain.angle) * grain.radius * 0.34;

    context.beginPath();
    context.arc(x, y, grain.width, 0, Math.PI * 2);
    context.fillStyle = "rgba(85, 64, 175, 0.18)";
    context.fill();
  });

  requestAnimationFrame(drawSpace);
}

resizeCanvas();
drawSpace();
window.addEventListener("resize", resizeCanvas);
