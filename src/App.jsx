import { useEffect, useMemo, useRef, useState } from "react";

const introLines = [
  "Hi, I am Varun Shivaram.",
  "I build thoughtful MERN products.",
  "I am growing into cloud and agentic AI systems.",
];

const strengths = [
  {
    title: "Full-stack development",
    body: "MERN-first web apps with clean frontend structure, APIs, auth flows, and practical deployment habits.",
    tools: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    title: "Cloud engineering beginner",
    body: "Learning cloud foundations through Azure, AWS, Linux environments, and the mindset of building for scale step by step.",
    tools: ["Azure", "AWS", "Linux", "REST APIs"],
  },
  {
    title: "Agentic AI builder",
    body: "Building retrieval, local inference, and assistant-style workflows that feel useful instead of overhyped.",
    tools: ["Ollama", "RAG", "Whisper", "Python"],
  },
];

const projects = [
  {
    name: "RAG Course Navigator",
    label: "Agentic AI",
    text: "A local teaching assistant that retrieves answers from educational videos, explains them clearly, and points back to the right timestamp.",
    stack: ["Python", "Whisper", "bge-m3", "Ollama", "Streamlit"],
  },
  {
    name: "Hate Speech Detector",
    label: "Applied AI",
    text: "An audio moderation workflow that transcribes speech, detects harmful terms, and censors the output while keeping user privacy in mind.",
    stack: ["Flask", "Vosk", "pydub", "NumPy"],
  },
  {
    name: "Browser Dino Game",
    label: "Frontend + Logic",
    text: "A small but complete browser game with collision handling, scoring, animation, and continuous deployment through GitHub Actions.",
    stack: ["HTML", "CSS", "JavaScript", "GitHub Actions"],
  },
];

const timeline = [
  {
    period: "2025 - Present",
    role: "Research Engineer Intern",
    place: "Nous Infosystems",
    text: "Working on full-stack product features, APIs, database-backed workflows, and code improvements inside real engineering delivery.",
  },
  {
    period: "2024 - 2025",
    role: "AI Project Intern",
    place: "Edunet Foundation",
    text: "Built an end-to-end AI project under the TechSaksham initiative and got hands-on exposure to applied AI workflows.",
  },
];

const toolGroups = [
  { name: "Frontend", items: ["React", "JavaScript", "HTML", "CSS"] },
  { name: "Backend", items: ["Node.js", "Express.js", "Flask"] },
  { name: "Data", items: ["MongoDB", "MySQL", "SQL", "Pandas", "NumPy"] },
  { name: "Cloud + Dev", items: ["Azure", "AWS", "Linux", "Git", "Postman"] },
];

function useTypewriter(lines) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex];
    const doneTyping = !isDeleting && charIndex === current.length;
    const doneDeleting = isDeleting && charIndex === 0;
    const delay = doneTyping ? 1200 : isDeleting ? 26 : 52;

    const timer = window.setTimeout(() => {
      if (doneTyping) {
        setIsDeleting(true);
        return;
      }

      if (doneDeleting) {
        setIsDeleting(false);
        setLineIndex((prev) => (prev + 1) % lines.length);
        return;
      }

      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, isDeleting, lineIndex, lines]);

  return `${lines[lineIndex].slice(0, charIndex)}`;
}

function SpaceCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let frameId = 0;
    let width = 0;
    let height = 0;
    let stars = [];
    let arcs = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      stars = Array.from({ length: Math.max(90, Math.floor(width / 12)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.7 + 0.2,
        alpha: Math.random() * 0.55 + 0.1,
        drift: Math.random() * 0.18 + 0.03,
        pulse: Math.random() * Math.PI * 2,
      }));

      arcs = Array.from({ length: 64 }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * Math.min(width, height) * 0.18 + 56,
        speed: Math.random() * 0.005 + 0.0015,
        thickness: Math.random() * 2.2 + 0.7,
      }));
    };

    const draw = () => {
      const coreX = width * 0.76;
      const coreY = height * 0.22;
      context.clearRect(0, 0, width, height);

      const wash = context.createLinearGradient(0, 0, width, height);
      wash.addColorStop(0, "rgba(4, 13, 29, 0.98)");
      wash.addColorStop(0.45, "rgba(8, 24, 43, 0.94)");
      wash.addColorStop(1, "rgba(4, 13, 29, 0.98)");
      context.fillStyle = wash;
      context.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.y += star.drift;
        star.pulse += 0.02;
        if (star.y > height + 3) {
          star.y = -3;
          star.x = Math.random() * width;
        }

        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(176, 239, 255, ${star.alpha + Math.sin(star.pulse) * 0.12})`;
        context.fill();
      });

      const halo = context.createRadialGradient(coreX, coreY, 0, coreX, coreY, Math.min(width, height) * 0.34);
      halo.addColorStop(0, "rgba(244, 103, 255, 0.14)");
      halo.addColorStop(0.2, "rgba(91, 210, 255, 0.15)");
      halo.addColorStop(0.42, "rgba(255, 194, 90, 0.1)");
      halo.addColorStop(1, "rgba(4, 13, 29, 0)");
      context.fillStyle = halo;
      context.fillRect(0, 0, width, height);

      arcs.forEach((arc) => {
        arc.angle += arc.speed;
        const x = coreX + Math.cos(arc.angle) * arc.radius;
        const y = coreY + Math.sin(arc.angle) * arc.radius * 0.38;
        context.beginPath();
        context.arc(x, y, arc.thickness, 0, Math.PI * 2);
        context.fillStyle = "rgba(114, 232, 255, 0.16)";
        context.fill();
      });

      context.beginPath();
      context.ellipse(coreX, coreY, 180, 72, -0.28, 0, Math.PI * 2);
      context.strokeStyle = "rgba(255, 183, 77, 0.55)";
      context.lineWidth = 18;
      context.stroke();

      context.beginPath();
      context.ellipse(coreX, coreY, 160, 54, -0.28, 0, Math.PI * 2);
      context.strokeStyle = "rgba(124, 243, 255, 0.46)";
      context.lineWidth = 10;
      context.stroke();

      context.beginPath();
      context.arc(coreX, coreY, 68, 0, Math.PI * 2);
      context.fillStyle = "rgba(1, 4, 10, 0.98)";
      context.fill();

      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="space-canvas" aria-hidden="true" />;
}

function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: "Helpful",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = form.name.trim() && form.message.trim();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="feedback-success">
        <p className="section-kicker">Feedback received</p>
        <h3>Thanks for taking a minute.</h3>
        <p>Your response stays local on this page for now, but the form flow is ready to wire into email or a backend later.</p>
      </div>
    );
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>
          <span>Name</span>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        </label>
      </div>
      <div className="rating-group">
        <span>How did it feel?</span>
        <div className="rating-options">
          {["Helpful", "Clear", "Memorable"].map((option) => (
            <button
              key={option}
              type="button"
              className={form.rating === option ? "active" : ""}
              onClick={() => setForm((current) => ({ ...current, rating: option }))}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <label>
        <span>Feedback</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Share what stood out, what felt strong, or what could be improved."
          rows="6"
        />
      </label>
      <button className="submit-button" type="submit" disabled={!canSubmit}>
        Send feedback
      </button>
    </form>
  );
}

export default function App() {
  const typedLine = useTypewriter(introLines);
  const yearLabel = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="app-shell">
      <SpaceCanvas />
      <div className="noise-layer" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brand-mark">VS</span>
          <span>Varun Shivaram</span>
        </a>
        <nav>
          <a href="#focus">Focus</a>
          <a href="#projects">Projects</a>
          <a href="#journey">Journey</a>
          <a href="#feedback">Feedback</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <h1>
              <span>{typedLine}</span>
              <span className="cursor" aria-hidden="true" />
            </h1>
            <p className="hero-text">
              I am a MERN-focused full-stack developer, a beginner in cloud engineering, and an agentic AI builder who likes clear tools, clean interfaces, and practical systems.
            </p>
            <div className="hero-badges">
              <span>MERN stack</span>
              <span>Azure / AWS learner</span>
              <span>Agentic AI workflows</span>
            </div>
            <div className="hero-actions">
              <a className="primary-link" href="#projects">Explore projects</a>
              <a className="secondary-link" href="mailto:varunshivaram2024@gmail.com">Start a conversation</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="portrait-card">
              <div className="portrait-glow" />
              <img src="/assets/img/varun-photo.png" alt="Varun Shivaram portrait" />
              <div className="portrait-caption">
                <strong>Builder profile</strong>
                <span>Full-stack, cloud foundations, AI workflows</span>
              </div>
            </div>

            <div className="status-card top">
              <strong>8.98</strong>
              <span>CGPA</span>
            </div>

            <div className="status-card bottom">
              <strong>Now building</strong>
              <span>Practical MERN apps and local AI assistants</span>
            </div>
          </div>
        </section>

        <section className="focus-grid" id="focus">
          {strengths.map((item) => (
            <article className="focus-card" key={item.title}>
              <p className="section-kicker">{item.title}</p>
              <p>{item.body}</p>
              <div className="chip-row">
                {item.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <p className="section-kicker">Selected work</p>
            <h2>Projects that show how I build, not just what I claim.</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <span className="project-label">{project.label}</span>
                <h3>{project.name}</h3>
                <p>{project.text}</p>
                <div className="chip-row">
                  {project.stack.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-section" id="journey">
          <div className="section-heading">
            <p className="section-kicker">Journey</p>
            <h2>Steady growth across product work, cloud basics, and AI experimentation.</h2>
          </div>
          <div className="journey-layout">
            <div className="timeline">
              {timeline.map((item) => (
                <article className="timeline-card" key={item.role}>
                  <span>{item.period}</span>
                  <h3>{item.role}</h3>
                  <strong>{item.place}</strong>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <div className="tool-panel">
              <p className="section-kicker">Tools I use</p>
              {toolGroups.map((group) => (
                <div className="tool-group" key={group.name}>
                  <h3>{group.name}</h3>
                  <div className="chip-row">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="feedback-section" id="feedback">
          <div className="section-heading">
            <p className="section-kicker">Feedback</p>
            <h2>Leave a note if something here felt strong, useful, or worth improving.</h2>
          </div>
          <FeedbackForm />
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; {yearLabel} Varun Shivaram</p>
        <div>
          <a href="https://github.com/varunshivaram56" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/varun-shivaram-32538132b" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:varunshivaram2024@gmail.com">Email</a>
        </div>
      </footer>
    </div>
  );
}
