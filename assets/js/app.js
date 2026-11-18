/**
 * =====================================================================
 * RIMOR Labs — Stealth Pre-Launch & Interactive CLI Sneak-Peek Controller
 * Supports all 4 Concept Versions (index.html, version-2.html, version-3.html, version-4.html)
 * Modules:
 *   1. Cursor-Tracked Recon Flashlight + Torch Follower + Lissajous Auto-Scan
 *   2. Interactive rimor://cli Sneak-Peek Terminal + Module Triggers + V3 Dossier Sync
 *   3. Netlify Forms AJAX Handler (with Local Preview Fallback)
 *   4. PGP Cryptographic Identity Modal & Footer Year
 * =====================================================================
 */

(() => {
  "use strict";

  document.documentElement.classList.remove("no-js");
  document.documentElement.classList.add("js-enabled");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const isTouchOrNoHover = window.matchMedia("(hover: none)");

  /* ===================================================================
     1. RECON FLASHLIGHT SCANNER (SMOOTH AUTO-SWEEP + MOUSE TRACKING)
     =================================================================== */
  const initReconScanner = () => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    let pointerActive = false;
    let rafId = null;
    let currentX = 72;
    let currentY = 38;
    let targetX = 72;
    let targetY = 38;

    const applyCoordinates = (xPct, yPct) => {
      hero.style.setProperty("--x", `${xPct.toFixed(2)}%`);
      hero.style.setProperty("--y", `${yPct.toFixed(2)}%`);
    };

    const stepScanner = (now) => {
      if (prefersReducedMotion.matches) {
        applyCoordinates(72, 38);
        return;
      }

      if (!pointerActive || isTouchOrNoHover.matches) {
        // Smooth Lissajous light sweep across the hero canvas when mouse is idle/outside
        const t = now * 0.0006;
        targetX = 50 + Math.sin(t * 1.3) * 38;
        targetY = 48 + Math.cos(t * 1.9 + 0.6) * 34;
      }

      const ease = pointerActive ? 0.22 : 0.08;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      applyCoordinates(currentX, currentY);
    };

    const tick = (timestamp) => {
      stepScanner(timestamp || performance.now());
      rafId = window.requestAnimationFrame(tick);
    };

    hero.addEventListener(
      "pointermove",
      (event) => {
        const rect = hero.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        targetX = Math.max(2, Math.min(98, x));
        targetY = Math.max(2, Math.min(98, y));
        pointerActive = true;
      },
      { passive: true }
    );

    hero.addEventListener("pointerleave", () => {
      pointerActive = false;
    });

    applyCoordinates(currentX, currentY);
    if (!prefersReducedMotion.matches) {
      rafId = window.requestAnimationFrame(tick);
      // Fallback heartbeat when preview pane is unfocused so the light still sweeps
      const intervalId = window.setInterval(() => {
        if (document.hidden) {
          stepScanner(performance.now());
        }
      }, 50);
      window.addEventListener("unload", () => {
        if (rafId) window.cancelAnimationFrame(rafId);
        window.clearInterval(intervalId);
      });
    }
  };

  /* ===================================================================
     2. INTERACTIVE "rimor://cli" SNEAK PEEK WORKBENCH
     =================================================================== */
  const CLI_RESPONSES = {
    help: {
      cmdDisplay: "help",
      title: "RIMOR://CLI SNEAK-PEEK COMMANDS",
      dossierTitle: "CLI Command Reference",
      dossierLead: "Use any of the commands below—or click a service module—to inspect what RIMOR Labs is launching.",
      bullets: [
        "overview — Full sneak peek of what RIMOR Labs is launching",
        "offense — [01] Penetration Testing, Red Teaming, AI Red Teaming & Purple Team",
        "defense — [02] Sigma Detection Engineering, YARA/KQL & SOC Tuning",
        "architecture — [03] Zero-Trust, SABSA/TOGAF, Cloud & AI Security",
        "governance — [04] vCISO, NIS2, DORA, ISO 27001 & CRISC Risk"
      ],
      body: [
        "  overview      Full sneak peek of what RIMOR Labs is launching",
        "  offense       [01] Penetration Testing, Red Teaming, AI Red Teaming & Purple Team",
        "  defense       [02] Sigma Detection Engineering, YARA/KQL & SOC Tuning",
        "  architecture  [03] Zero-Trust, SABSA/TOGAF, Cloud & AI Security",
        "  governance    [04] vCISO, NIS2, DORA, ISO 27001 & CRISC Risk",
        "  nis2          Deep-dive into our EU NIS2 & DORA readiness sprint",
        "  eta           Check platform construction progress & early access",
        "  contact       Jump to early-access briefing request",
        "  clear         Clear terminal output"
      ].join("\n"),
      pills: ["overview", "offense", "defense", "architecture", "governance", "nis2"]
    },
    overview: {
      cmdDisplay: "sneak-peek --all",
      title: "SNEAK PEEK // WHAT TO EXPECT FROM RIMOR LABS [BUILD 94%]",
      dossierTitle: "What to Expect from RIMOR Labs",
      dossierLead:
        "Most security vendors live in a single silo: pentesters drop PDFs, SOCs drown in noisy alerts, and compliance consultants write policies detached from engineering reality. RIMOR Labs bridges all four worlds under one senior roof.",
      bullets: [
        "[01] OFFENSE :: Manual Pentesting, Red Teaming, AI Red Teaming & Assumed-Breach Ops",
        "[02] DEFENSE :: Sigma / KQL / YARA Detection-as-Code & Telemetry Pipelines",
        "[03] ARCHITECTURE :: Zero-Trust, Cloud (AWS/Azure/GCP) & AI Guardrails",
        "[04] GOVERNANCE :: Fractional vCISO, NIS2, DORA, ISO 27001 & CRISC Risk"
      ],
      body: [
        "Most security vendors live in a single silo: pentesters drop PDFs, SOCs drown in noisy alerts, and compliance consultants write policies detached from engineering reality.",
        "",
        "RIMOR Labs is launching to bridge all four worlds under one senior roof:",
        "  [01] OFFENSE      :: Manual Pentesting, Red Teaming, AI Red Teaming & Assumed-Breach Ops",
        "  [02] DEFENSE      :: Sigma / KQL / YARA Detection-as-Code & Telemetry",
        "  [03] ARCHITECTURE :: Zero-Trust, Cloud (AWS/Azure/GCP) & AI Guardrails",
        "  [04] GOVERNANCE   :: Fractional vCISO, NIS2, DORA, ISO 27001 & CRISC Risk",
        "",
        "→ STATUS: Public platform under construction. Early client briefings open now."
      ].join("\n"),
      pills: ["Red & Purple Team", "AI Red Teaming", "Sigma Detection Eng", "Zero-Trust Cloud/AI", "vCISO · NIS2 · ISO 27001"]
    },
    offense: {
      cmdDisplay: "probe --module offense",
      title: "SNEAK PEEK [01] // OFFENSIVE SECURITY & RED TEAMING",
      dossierTitle: "01 / Offensive Security, Red Teaming & AI Red Teaming",
      dossierLead:
        "Adversary-grade offensive testing across applications, cloud estates, internal networks, and AI/LLM systems to uncover real-world attack paths.",
      bullets: [
        "Full-scope Web, API, Mobile, Cloud & Internal Infrastructure Pentesting",
        "Objective-driven Red Team operations & assumed-breach simulations",
        "AI & LLM Red Teaming: adversarial prompt injection, guardrail bypass & agentic workflow testing",
        "Collaborative Purple Team attack replays directly with your Blue Team"
      ],
      body: [
        "What you can expect when you engage RIMOR Labs for Offense:",
        "  • Full-scope Web, API, Mobile, Cloud & Internal Infrastructure Pentesting",
        "  • Objective-driven Red Team operations & assumed-breach simulations",
        "  • AI & LLM Red Teaming: adversarial prompt injection, guardrail bypass & agentic workflow testing",
        "  • Collaborative Purple Team attack replays directly with your Blue Team"
      ].join("\n"),
      pills: ["PTES", "OSSTMM", "MITRE ATT&CK", "OWASP ASVS", "Red / Purple Teaming", "AI Red Teaming", "AD & Cloud Exploitation"]
    },
    defense: {
      cmdDisplay: "probe --module defense",
      title: "SNEAK PEEK [02] // DETECTION ENGINEERING & BLUE TEAM OPS",
      dossierTitle: "02 / Detection Engineering & Blue Team Ops",
      dossierLead:
        "High-fidelity Detection-as-Code and telemetry engineering designed to eliminate alert fatigue and validate coverage against MITRE ATT&CK.",
      bullets: [
        "Custom, version-controlled Detection-as-Code rules (Sigma, YARA, KQL)",
        "EDR / XDR / SIEM telemetry pipeline engineering & log volume optimization",
        "Alert fatigue elimination & false-positive tuning backed by live attack replay",
        "Threat hunting & MITRE ATT&CK coverage heatmaps for your SOC"
      ],
      body: [
        "What you can expect from our Detection Engineering practice:",
        "  • Custom, version-controlled Detection-as-Code rules (Sigma, YARA, KQL)",
        "  • EDR / XDR / SIEM telemetry pipeline engineering & log volume optimization",
        "  • Alert fatigue elimination & false-positive tuning backed by live attack replay",
        "  • Threat hunting & MITRE ATT&CK coverage heatmaps for your SOC"
      ].join("\n"),
      pills: ["Sigma", "YARA", "EDR / XDR Telemetry", "MITRE ATT&CK", "Log Pipeline Design", "Purple Team Validation"]
    },
    architecture: {
      cmdDisplay: "probe --module architecture",
      title: "SNEAK PEEK [03] // ZERO-TRUST, CLOUD & AI SECURITY ARCHITECTURE",
      dossierTitle: "03 / Zero-Trust, Cloud & AI Security Architecture",
      dossierLead:
        "Enterprise, multi-cloud, and AI security architecture designed from first principles (SABSA & TOGAF) so security accelerates engineering.",
      bullets: [
        "Enterprise security architecture designed from first principles (SABSA, TOGAF)",
        "Identity-first Zero-Trust micro-segmentation & threat modelling (STRIDE/PASTA)",
        "End-to-end AWS, Azure & GCP posture hardening, least-privilege IAM & IaC gates",
        "Secure AI adoption: LLM guardrails, RAG data isolation & EU AI Act alignment"
      ],
      body: [
        "What you can expect from our Security Architecture practice:",
        "  • Enterprise security architecture designed from first principles (SABSA, TOGAF)",
        "  • Identity-first Zero-Trust micro-segmentation & threat modelling (STRIDE/PASTA)",
        "  • End-to-end AWS, Azure & GCP posture hardening, least-privilege IAM & IaC gates",
        "  • Secure AI adoption: LLM guardrails, prompt-injection defense & EU AI Act alignment"
      ].join("\n"),
      pills: ["Zero-Trust", "SABSA", "TOGAF", "Threat Modelling", "AWS · Azure · GCP", "IAM & IaC", "EU AI Act Guardrails"]
    },
    governance: {
      cmdDisplay: "probe --module governance",
      title: "SNEAK PEEK [04] // CYBER GOVERNANCE, vCISO & RISK QUANTIFICATION",
      dossierTitle: "04 / Cyber Governance (vCISO, NIS2, ISO 27001 & Risk)",
      dossierLead:
        "Pragmatic European cyber governance, fractional CISO leadership, and CRISC risk quantification grounded in technical reality.",
      bullets: [
        "Fractional / Virtual CISO (vCISO) leadership & executive board reporting",
        "Pragmatic regulatory readiness for NIS2, DORA, ISO 27001, GDPR & SOC 2",
        "CRISC-aligned cyber risk quantification & independent internal ISMS audits",
        "End-to-end security maturity assessments & crisis tabletop simulations"
      ],
      body: [
        "What you can expect from our Governance & Advisory practice:",
        "  • Fractional / Virtual CISO (vCISO) leadership & executive board reporting",
        "  • Pragmatic regulatory readiness for NIS2, DORA, ISO 27001, GDPR & SOC 2",
        "  • CRISC-aligned cyber risk quantification & independent internal ISMS audits",
        "  • End-to-end security maturity assessments & crisis tabletop simulations"
      ].join("\n"),
      pills: ["vCISO", "NIS2 Directive", "DORA", "ISO 27001", "GDPR", "CRISC Risk Quantification", "Internal Audit"]
    },
    nis2: {
      cmdDisplay: "probe --topic nis2-dora",
      title: "SNEAK PEEK // EU NIS2 DIRECTIVE & DORA FAST-TRACK",
      dossierTitle: "EU NIS2 Directive & DORA Readiness",
      dossierLead:
        "Need to align with European cyber regulations without drowning in bureaucracy? Every policy is mapped directly to engineering controls.",
      bullets: [
        "Art. 20 Governance: Board accountability briefings & executive risk sign-off",
        "Art. 21 Controls: Risk management, supply-chain security, cryptography & MFA",
        "Art. 23 Reporting: 24h Early Warning / 72h Incident Notification playbooks",
        "Engineering Link: Every policy mapped directly to technical controls & detections"
      ],
      body: [
        "Need to align with European cyber regulations without drowning in bureaucracy?",
        "  • Art. 20 Governance : Board accountability briefings & executive risk sign-off",
        "  • Art. 21 Controls   : Risk management, supply-chain security, cryptography & MFA",
        "  • Art. 23 Reporting  : 24h Early Warning / 72h Incident Notification playbooks",
        "  • Engineering Link   : Every policy mapped directly to technical controls & detections"
      ].join("\n"),
      pills: ["NIS2 Art. 20-23", "DORA ICT Risk", "ISO/IEC 27001:2022", "Supply-Chain Assurance"]
    },
    eta: {
      cmdDisplay: "status --deployment",
      title: "PLATFORM CONSTRUCTION TELEMETRY",
      dossierTitle: "Platform Construction Telemetry [94%]",
      dossierLead:
        "While our full web portal is in final staging, our core security practice is 100% operational for early client briefings.",
      bullets: [
        "Core Security Practice: 100% OPERATIONAL (Early Mandates Open)",
        "Recon & Advisory Engine: 95% STAGING",
        "Public Case Studies: 86% REVIEW",
        "Full Web Portal Release: 94% INCOMING"
      ],
      body: [
        "  Core Security Practice  : [████████████████████] 100% OPERATIONAL (Early Mandates Open)",
        "  Recon & Advisory Engine : [███████████████████░]  95% STAGING",
        "  Public Case Studies     : [█████████████████░░░]  86% REVIEW",
        "  Full Web Portal Release : [██████████████████░░]  94% INCOMING",
        "",
        "→ Request an early briefing via the form below."
      ].join("\n"),
      pills: ["BUILD 0.94-RC", "STEALTH MODE", "EARLY ACCESS OPEN"]
    },
    contact: {
      cmdDisplay: "open --channel early-access",
      title: "OPENING PRIORITY BRIEFING CHANNEL",
      dossierTitle: "Priority Briefing Channel",
      dossierLead: "Direct encrypted channel to RIMOR Labs founding practitioners.",
      bullets: [
        "Direct Mailbox: security@rimorlabs.eu",
        "PGP Fingerprint: 9F4A 8C2E 7D11 B503 4E9A 1C88 B205 D7E4 C901 3FA2"
      ],
      body: [
        "• Direct Mailbox  : security@rimorlabs.eu",
        "• PGP Fingerprint : 9F4A 8C2E 7D11 B503 4E9A 1C88 B205 D7E4 C901 3FA2",
        "• Action          : Scrolling to #contact early-access dispatch form..."
      ].join("\n"),
      pills: []
    }
  };

  const COMMAND_ALIASES = {
    "sneak-peek": "overview",
    "sneak-peek --all": "overview",
    services: "overview",
    all: "overview",
    "red-team": "offense",
    pentest: "offense",
    red: "offense",
    "ai-red-team": "offense",
    blue: "defense",
    detection: "defense",
    sigma: "defense",
    soc: "defense",
    arch: "architecture",
    cloud: "architecture",
    ai: "architecture",
    zerotrust: "architecture",
    vciso: "governance",
    grc: "governance",
    iso: "governance",
    iso27001: "governance",
    dora: "nis2",
    status: "eta",
    build: "eta",
    "early-access": "contact"
  };

  const initSneakPeekWorkbench = () => {
    const output = document.getElementById("terminalOutput");
    const form = document.getElementById("terminalForm");
    const input = document.getElementById("terminalInput");
    const chips = document.querySelectorAll(".cmd-chip");
    const moduleTriggers = Array.from(document.querySelectorAll(".module-trigger"));

    // Optional V3 Dossier Elements
    const dossierCode = document.getElementById("dossierCode");
    const dossierTitle = document.getElementById("dossierTitle");
    const dossierLead = document.getElementById("dossierLead");
    const dossierBullets = document.getElementById("dossierBullets");
    const dossierPills = document.getElementById("dossierPills");

    if (!output || !form || !input) return;

    const history = [];
    let historyIndex = -1;

    const syncModuleHighlight = (canonicalKey) => {
      moduleTriggers.forEach((btn) => {
        const isMatch = btn.dataset.cmd === canonicalKey;
        btn.classList.toggle("active", isMatch);
        btn.setAttribute("aria-selected", String(isMatch));
      });
    };

    const syncV3Dossier = (matched) => {
      if (!matched || !dossierTitle) return;
      if (dossierCode) dossierCode.textContent = matched.title;
      if (dossierTitle) dossierTitle.textContent = matched.dossierTitle || matched.title;
      if (dossierLead) dossierLead.textContent = matched.dossierLead || "";
      if (dossierBullets && Array.isArray(matched.bullets)) {
        dossierBullets.replaceChildren(
          ...matched.bullets.map((b) => {
            const li = document.createElement("li");
            li.textContent = b;
            return li;
          })
        );
      }
      if (dossierPills && Array.isArray(matched.pills)) {
        dossierPills.replaceChildren(
          ...matched.pills.map((p) => {
            const span = document.createElement("span");
            span.className = "term-pill";
            span.textContent = p;
            return span;
          })
        );
      }
    };

    const runCommand = (rawInput) => {
      const cleaned = rawInput.trim().toLowerCase();
      if (!cleaned) return;

      if (cleaned === "clear") {
        output.replaceChildren();
        const clearedNode = document.createElement("div");
        clearedNode.className = "term-entry";
        const muted = document.createElement("div");
        muted.className = "term-muted";
        muted.textContent = "Terminal cleared. Type 'overview' or 'help' to probe incoming RIMOR Labs services.";
        clearedNode.appendChild(muted);
        output.appendChild(clearedNode);
        return;
      }

      const canonical = COMMAND_ALIASES[cleaned] || cleaned;
      const matched = CLI_RESPONSES[canonical];

      const entry = document.createElement("div");
      entry.className = "term-entry";

      const cmdLine = document.createElement("div");
      cmdLine.className = "term-cmd-line";
      cmdLine.textContent = `guest@rimor-preview:~$ ${matched ? matched.cmdDisplay : rawInput}`;
      entry.appendChild(cmdLine);

      if (matched) {
        syncModuleHighlight(canonical);
        syncV3Dossier(matched);

        const banner = document.createElement("div");
        banner.className = "term-banner";
        banner.textContent = matched.title;
        entry.appendChild(banner);

        const body = document.createElement("div");
        body.className = "term-list";
        body.textContent = matched.body;
        entry.appendChild(body);

        if (matched.pills && matched.pills.length > 0) {
          const pillsRow = document.createElement("div");
          pillsRow.className = "term-pills-row";
          matched.pills.forEach((p) => {
            const chip = document.createElement("span");
            chip.className = "term-pill";
            chip.textContent = p;
            pillsRow.appendChild(chip);
          });
          entry.appendChild(pillsRow);
        }

        if (canonical === "contact") {
          const contactSection = document.getElementById("contact");
          if (contactSection) {
            window.setTimeout(() => {
              contactSection.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
            }, 300);
          }
        }
      } else {
        const unknown = document.createElement("div");
        unknown.className = "term-muted";
        unknown.textContent = `Unknown probe '${rawInput}'. Try: overview, offense, defense, architecture, governance, nis2, eta, or help.`;
        entry.appendChild(unknown);
      }

      output.appendChild(entry);
      output.scrollTop = output.scrollHeight;
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      history.push(value);
      historyIndex = history.length;
      runCommand(value);
      input.value = "";
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        if (history.length > 0 && historyIndex > 0) {
          event.preventDefault();
          historyIndex -= 1;
          input.value = history[historyIndex];
        }
      } else if (event.key === "ArrowDown") {
        if (historyIndex < history.length - 1) {
          event.preventDefault();
          historyIndex += 1;
          input.value = history[historyIndex];
        } else {
          historyIndex = history.length;
          input.value = "";
        }
      }
    });

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const cmd = chip.dataset.cmd;
        if (!cmd) return;
        history.push(cmd);
        historyIndex = history.length;
        runCommand(cmd);
      });
    });

    moduleTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const cmd = trigger.dataset.cmd;
        if (!cmd) return;
        history.push(cmd);
        historyIndex = history.length;
        runCommand(cmd);
      });
    });

    // Boot the terminal with the initial sneak-peek overview
    runCommand("overview");
  };

  /* ===================================================================
     3. ZERO-COST NETLIFY FORMS AJAX SUBMISSION
     =================================================================== */
  const isLocalPreviewEnvironment = () => {
    const { protocol, hostname } = window.location;
    return (
      protocol === "file:" ||
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.endsWith(".local")
    );
  };

  const bindNetlifyForm = (formId, feedbackId, successMessage) => {
    const form = document.getElementById(formId);
    const feedback = document.getElementById(feedbackId);
    if (!form || !feedback) return;

    const setFeedback = (type, message) => {
      feedback.className = `form-feedback ${type === "success" ? "is-success" : "is-error"}`;
      feedback.textContent = message;
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      feedback.className = "form-feedback";
      feedback.textContent = "";

      if (!form.checkValidity()) {
        form.reportValidity();
        setFeedback("error", "[!] Please complete all required fields with a valid work email address.");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "TRANSMITTING...";
      }

      const formData = new FormData(form);
      const urlEncodedBody = new URLSearchParams(formData).toString();

      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: urlEncodedBody
        });

        if (response.ok) {
          setFeedback("success", successMessage);
          form.reset();
        } else if (isLocalPreviewEnvironment()) {
          setFeedback(
            "success",
            `${successMessage} [Local Preview Mode: Payload verified & ready for Netlify production capture.]`
          );
          form.reset();
        } else {
          setFeedback(
            "error",
            `[!] Transmission returned HTTP ${response.status}. Please retry or contact security@rimorlabs.eu.`
          );
        }
      } catch {
        if (isLocalPreviewEnvironment()) {
          setFeedback(
            "success",
            `${successMessage} [Local Preview Mode: Payload verified & ready for Netlify production capture.]`
          );
          form.reset();
        } else {
          setFeedback(
            "error",
            "[!] Network error while transmitting form. Please verify connectivity or email security@rimorlabs.eu."
          );
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  };

  /* ===================================================================
     4. PGP MODAL & FOOTER YEAR
     =================================================================== */
  const initChromeAndModals = () => {
    const yearSpan = document.getElementById("currentYear");
    if (yearSpan) {
      yearSpan.textContent = String(new Date().getFullYear());
    }

    const pgpModal = document.getElementById("pgpModal");
    const openBtn = document.getElementById("pgpModalOpenBtn");
    const closeBtn = document.getElementById("pgpModalCloseBtn");
    const copyBtn = document.getElementById("copyPgpBtn");
    const fpText = document.getElementById("pgpFingerprintText");

    if (pgpModal && openBtn && closeBtn) {
      const openModal = () => {
        pgpModal.hidden = false;
        closeBtn.focus();
      };

      const closeModal = () => {
        pgpModal.hidden = true;
        openBtn.focus();
      };

      openBtn.addEventListener("click", openModal);
      closeBtn.addEventListener("click", closeModal);

      pgpModal.addEventListener("click", (event) => {
        if (event.target === pgpModal) closeModal();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !pgpModal.hidden) {
          closeModal();
        }
      });
    }

    if (copyBtn && fpText) {
      copyBtn.addEventListener("click", async () => {
        const rawFp = fpText.textContent.trim();
        try {
          await navigator.clipboard.writeText(rawFp);
          copyBtn.textContent = "Copied ✓";
          window.setTimeout(() => {
            copyBtn.textContent = "Copy Fingerprint";
          }, 2200);
        } catch {
          copyBtn.textContent = "Select & Copy Above";
        }
      });
    }
  };

  /* ===================================================================
     BOOTSTRAP ON DOM READY
     =================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    initReconScanner();
    initSneakPeekWorkbench();
    bindNetlifyForm(
      "rimorBriefingForm",
      "briefingFormFeedback",
      "✔ Early access request transmitted. A RIMOR Labs principal will respond within one business day."
    );
    initChromeAndModals();
  });
})();
