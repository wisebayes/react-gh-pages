import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import './App.css';

// ---------------------------------------------------------------------------
// WebGL particle constellation background
// Renders an animated star-field with subtle connecting lines.
// Attaches to a provided container ref; cleans up on unmount.
// ---------------------------------------------------------------------------
function ParticleBackground({ containerRef }) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const PARTICLE_COUNT = 200;
    const SPREAD = 80;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
      velocities.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x6e8efb,
      size: 0.6,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Pre-allocate line geometry for connections within threshold distance
    const LINE_THRESHOLD = 12;
    const maxLines = PARTICLE_COUNT * 6;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.3 });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const posAttr = pointsGeometry.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr[i * 3]     += velocities[i * 3];
        arr[i * 3 + 1] += velocities[i * 3 + 1];
        arr[i * 3 + 2] += velocities[i * 3 + 2];
        for (let axis = 0; axis < 3; axis++) {
          if (Math.abs(arr[i * 3 + axis]) > SPREAD / 2) {
            velocities[i * 3 + axis] *= -1;
          }
        }
      }
      posAttr.needsUpdate = true;

      let lineIdx = 0;
      for (let i = 0; i < PARTICLE_COUNT && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < maxLines; j++) {
          const dx = arr[i * 3]     - arr[j * 3];
          const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
          const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < LINE_THRESHOLD) {
            const alpha = 1 - dist / LINE_THRESHOLD;
            linePositions[lineIdx * 6]     = arr[i * 3];
            linePositions[lineIdx * 6 + 1] = arr[i * 3 + 1];
            linePositions[lineIdx * 6 + 2] = arr[i * 3 + 2];
            linePositions[lineIdx * 6 + 3] = arr[j * 3];
            linePositions[lineIdx * 6 + 4] = arr[j * 3 + 1];
            linePositions[lineIdx * 6 + 5] = arr[j * 3 + 2];
            const c = 0.43 * alpha;
            lineColors[lineIdx * 6] = c; lineColors[lineIdx * 6 + 1] = c * 1.3; lineColors[lineIdx * 6 + 2] = c * 2.3;
            lineColors[lineIdx * 6 + 3] = c; lineColors[lineIdx * 6 + 4] = c * 1.3; lineColors[lineIdx * 6 + 5] = c * 2.3;
            lineIdx++;
          }
        }
      }
      // Zero out unused line slots
      for (let i = lineIdx * 6; i < maxLines * 6; i++) {
        linePositions[i] = 0;
        lineColors[i] = 0;
      }
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIdx * 2);

      // Subtle camera follow
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [containerRef]);

  return null;
}

// ---------------------------------------------------------------------------
// Intersection-observer hook for scroll-triggered reveal animations
// ---------------------------------------------------------------------------
function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold: 0.15, ...options }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

// Wrapper that applies fade-in-up on scroll
function Reveal({ children, className = '', delay = 0 }) {
  const [ref, isInView] = useInView();
  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section components
// ---------------------------------------------------------------------------

function SectionHeading({ title, subtitle }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="heading-rule" />
    </div>
  );
}

function ExperienceCard({ role, org, location, dates, bullets, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="card experience-card">
        <div className="card-header">
          <div>
            <h3 className="card-title">{role}</h3>
            <p className="card-org">{org}</p>
          </div>
          <div className="card-meta">
            <span className="card-dates">{dates}</span>
            <span className="card-location">{location}</span>
          </div>
        </div>
        <ul className="card-bullets">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>
    </Reveal>
  );
}

function EducationCard({ school, degree, gpa, dates, details, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="card education-card">
        <div className="card-header">
          <div>
            <h3 className="card-title">{school}</h3>
            <p className="card-org">{degree}</p>
            {gpa && <p className="card-gpa">GPA: {gpa}</p>}
          </div>
          <span className="card-dates">{dates}</span>
        </div>
        {details && details.length > 0 && (
          <ul className="card-bullets">
            {details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        )}
      </div>
    </Reveal>
  );
}

function SkillPill({ label }) {
  return <span className="skill-pill">{label}</span>;
}

// ---------------------------------------------------------------------------
// Data (sourced from the resume provided)
// ---------------------------------------------------------------------------
const EXPERIENCE = [
  {
    role: 'AI Engineer Intern',
    org: 'SolsticeHealth',
    location: 'New York, NY',
    dates: 'May 2025 \u2013 Aug 2025',
    bullets: [
      'Fine-tuned ViT-based decoders for chart/table extraction from clinical PDFs; improved correct field recall 62% \u2192 91% on 1.2k documents with rule-aware post-processing.',
      'Built an agentic workflow for UI template edits using LangGraph: NL \u2192 validated code diffs + guardrails; reduced manual review time 60% across 40+ updates/day.',
      'Cut tail latency 9x (p95 1.8s \u2192 200ms) at 800 RPS via a dedicated tool-microservice with load balancing, timeouts/retries, and backpressure.',
      'Built web/PDF ingestion and compliance editing pipelines (browser automation + Azure Document Intelligence + clustering) to extract brand rules and programmatically patch documents at scale.',
    ],
  },
  {
    role: 'Machine Learning Engineer',
    org: 'Newron.AI',
    location: 'Bangalore, India',
    dates: 'Jul 2023 \u2013 Mar 2024',
    bullets: [
      'Built DPO/RLHF training and evaluation pipelines (preference data ops, ranking loss, regression checks); improved win-rate vs baseline 43% \u2192 64% on 1k adjudicated prompts (QLoRA on open LLMs).',
      'Deployed retrieval + structured reasoning pipelines (RAG + knowledge graph patterns) with sub-second responses on corpora spanning 500+ companies; optimized caching/batching for cost and throughput.',
      'Reduced LLM query cost 70% and latency 45% by shipping an NL\u2192SQL intelligent cache (embedding clustering + memoization + TTL) across 12 analytics workflows.',
    ],
  },
  {
    role: 'NLP Intern (Team Lead)',
    org: 'Samsung R&D India',
    location: 'Bangalore, India',
    dates: 'Jan 2022 \u2013 Sep 2022',
    bullets: [
      'Led a team of 5 building code-switched (EN\u2013HI) speech/text models; achieved 90% detection accuracy and shipped an encoder-based classifier with 88% F1.',
    ],
  },
  {
    role: 'Research Intern',
    org: 'Laboratory for Translational Medicine, TMU',
    location: 'Toronto, Canada',
    dates: 'May 2022 \u2013 Aug 2022',
    bullets: [
      'Built CNN-LSTM tracking for intermodal MRI video streams (200ms intervals); achieved registration error <1mm for clinical target tracking.',
    ],
  },
];

const RESEARCH = [
  {
    role: 'Research Assistant \u2014 NLP Lab',
    org: 'Columbia University',
    location: 'New York, NY',
    dates: '2025 \u2013 Present',
    bullets: [
      'Studied masked diffusion language models for reasoning/planning with parallel token decoding; implemented training/inference hooks and profiled FLOPs vs. quality on task suites.',
      'Built an evaluation framework for computational humor: SFT + DPO + GRPO pipelines with pairwise contrastive synthetic data; added regression tests, prompt-control, and reproducible scoring.',
      'Probed humor representations in LLaMA-family models using Sparse Autoencoders (SAEs); implemented feature attribution + steering experiments to localize humor-related circuits.',
    ],
  },
  {
    role: 'Research Assistant \u2014 CausalAI Lab',
    org: 'Columbia University',
    location: 'New York, NY',
    dates: '2025 \u2013 Present',
    bullets: [
      'Built a semi-automated causal DAG builder for Causal RL environments (MuJoCo Adroit); designed interfaces for interventions, counterfactual rollouts, and graph validation.',
      'Implemented causal variants of RL algorithms in Gymnasium-style training loops; added evaluation harness reporting sample-efficiency, regret, and robustness under distribution shift.',
    ],
  },
  {
    role: 'Research Intern',
    org: 'National University of Singapore',
    location: 'Singapore',
    dates: 'Dec 2022 \u2013 May 2023',
    bullets: [
      'Genome rearrangement via DDQN: outperformed heuristic baseline by 18% (steps-to-goal) on permutations n < 15; built reproducible training + ablation harness.',
      'cGAN augmentation improved pathology classifier AUC 0.82 \u2192 0.90 on a 9-class dataset; added evaluation + data-quality checks.',
    ],
  },
];

const EDUCATION = [
  {
    school: 'Columbia University, Columbia Engineering',
    degree: 'M.S. Computer Science',
    gpa: '3.96/4',
    dates: 'Aug 2024 \u2013 Dec 2025',
    details: [
      'Coursework: Machine Learning Theory, Computational Learning Theory, Unsupervised Learning, High Performance ML (TA), LLM Interpretability & Alignment, Advanced Algorithms, Algorithms for Massive Data, Causal Inference',
      'Research: NLP Lab (Advisors: Prof. Zhou Yu, Prof. Kathleen McKeown); CausalAI Lab (RL/Causality)',
    ],
  },
  {
    school: 'Vellore Institute of Technology, India',
    degree: 'B.Tech Computer Science and Engineering',
    gpa: '9.40/10',
    dates: 'Jul 2019 \u2013 Jun 2023',
    details: [],
  },
];

const SKILLS = {
  'Languages': ['Python', 'C++', 'Java', 'JavaScript', 'R', 'MATLAB', 'SQL'],
  'ML Systems / Inference': ['PyTorch', 'torch.compile / TorchInductor', 'Triton', 'CUDA', 'Quantization (INT8/FP16)', 'ONNX Runtime', 'TensorRT', 'vLLM'],
  'LLM / ML': ['HuggingFace', 'JAX', 'RLHF/DPO', 'RAG', 'Evaluation Harnesses', 'Alignment & Probing'],
  'Profiling / Observability': ['Nsight Systems/Compute', 'NVTX', 'OpenTelemetry', 'Benchmarking', 'Load Testing'],
  'Backend / Infra': ['Microservices', 'REST APIs', 'gRPC', 'Concurrency', 'Caching', 'Redis', 'PostgreSQL', 'Spark', 'Docker', 'Kubernetes', 'CI/CD', 'AWS/GCP', 'Linux', 'Git'],
};

const PUBLICATION = {
  title: 'A Deep Ensemble Network for Lung Segmentation with Stochastic Weighted Averaging',
  venue: 'Elsevier Book of Chapters, Intelligent Data-Centric Systems (2023)',
};

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
function App() {
  const canvasRef = useRef(null);
  const [navVisible, setNavVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Show navbar after scrolling past the hero
  useEffect(() => {
    const onScroll = () => {
      setNavVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, []);

  const NAV_ITEMS = useMemo(() => [
    { id: 'experience', label: 'Experience' },
    { id: 'research', label: 'Research' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ], []);

  return (
    <div className="app">
      {/* ---- Sticky nav (appears on scroll) ---- */}
      <nav className={`topnav ${navVisible ? 'visible' : ''}`}>
        <span className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>CK</span>
        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
        <ul className={mobileMenuOpen ? 'open' : ''}>
          {NAV_ITEMS.map(n => (
            <li key={n.id}><button onClick={() => scrollTo(n.id)}>{n.label}</button></li>
          ))}
          <li>
            <a
              href="https://github.com/wisebayes"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link-ext"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>

      {/* ---- Hero ---- */}
      <header className="hero">
        <div className="hero-canvas" ref={canvasRef}>
          <ParticleBackground containerRef={canvasRef} />
        </div>
        <div className="hero-content">
          <h1 className="hero-name">Chandhru Karthick</h1>
          <p className="hero-tagline">
            CS @ Columbia &middot; ML Systems &middot; NLP Research
          </p>
          <div className="hero-links">
            <a href="mailto:chandhru.k@columbia.edu">chandhru.k@columbia.edu</a>
            <a href="https://github.com/wisebayes" target="_blank" rel="noopener noreferrer">github.com/wisebayes</a>
            <a href="https://linkedin.com/in/chandhru-k" target="_blank" rel="noopener noreferrer">linkedin.com/in/chandhru-k</a>
          </div>
          <button className="hero-cta" onClick={() => scrollTo('experience')}>
            View my work <span className="arrow-down">&darr;</span>
          </button>
        </div>
      </header>

      <main>
        {/* ---- Experience ---- */}
        <section id="experience" className="section">
          <Reveal><SectionHeading title="Industry Experience" /></Reveal>
          {EXPERIENCE.map((e, i) => (
            <ExperienceCard key={i} {...e} delay={i * 80} />
          ))}
        </section>

        {/* ---- Research ---- */}
        <section id="research" className="section">
          <Reveal><SectionHeading title="Research" /></Reveal>
          {RESEARCH.map((r, i) => (
            <ExperienceCard key={i} {...r} delay={i * 80} />
          ))}

          <Reveal delay={RESEARCH.length * 80}>
            <div className="card publication-card">
              <h3 className="card-title">Publication</h3>
              <p className="pub-title">{PUBLICATION.title}</p>
              <p className="pub-venue">{PUBLICATION.venue}</p>
            </div>
          </Reveal>
        </section>

        {/* ---- Education ---- */}
        <section id="education" className="section">
          <Reveal><SectionHeading title="Education" /></Reveal>
          {EDUCATION.map((e, i) => (
            <EducationCard key={i} {...e} delay={i * 80} />
          ))}
        </section>

        {/* ---- Skills ---- */}
        <section id="skills" className="section">
          <Reveal><SectionHeading title="Technical Skills" /></Reveal>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([category, items], ci) => (
              <Reveal key={category} delay={ci * 60}>
                <div className="skill-group">
                  <h4>{category}</h4>
                  <div className="skill-pills">
                    {items.map(s => <SkillPill key={s} label={s} />)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---- Contact ---- */}
        <section id="contact" className="section section-contact">
          <Reveal>
            <SectionHeading title="Get in Touch" subtitle="Open to research collaborations and ML/infra roles." />
          </Reveal>
          <Reveal delay={100}>
            <div className="contact-links">
              <a href="mailto:chandhru.k@columbia.edu" className="contact-btn">Email</a>
              <a href="https://github.com/wisebayes" target="_blank" rel="noopener noreferrer" className="contact-btn">GitHub</a>
              <a href="https://linkedin.com/in/chandhru-k" target="_blank" rel="noopener noreferrer" className="contact-btn">LinkedIn</a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Chandhru Karthick</p>
      </footer>
    </div>
  );
}

export default App;
