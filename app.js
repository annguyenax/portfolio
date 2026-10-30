const translations = {
  vi: {},
  en: {
    navProfile: "Profile", navEvidence: "Evidence", navContact: "Contact", downloadCv: "Download CV",
    available: "Open to internship / graduate opportunities",
    heroRole: "SOC INTERN / DETECTION LABS",
    summary: "Final-year Information Security student applying for SOC / Security Monitoring Intern roles. Ready to walk through: a Suricata rules lab, a 2-node logging/hardening lab, and an anomaly detector on TON_IoT — and expanding into AI security/C2 detection.",
    exploreWork: "Explore the evidence", noiseTitle: "NOISE BOARD · TON_IOT", noiseSub: "Detection vs. false positive, README (dataset lab)", noiseDefault: "Pick a layer. 4 layers, mean FP 16.0% (recomputed 2026-10, see README).", noiseLegendDet: "Detection", noiseLegendFp: "False positive", base: "Based in", education: "Education", evidenceFirst: "Approach",
    profileLabel: "PROFILE / CV", whatIDo: "I turn security problems into systems that can run, measure and be verified.",
    approach: "I work at the intersection of security engineering, machine learning and system operations. Every project prioritizes an explicit threat model, traceable data, reproducible tests and honest limitations.",
    capabilities: "Core capabilities", evidenceLabel: "EVIDENCE / SELECTED WORK", proofTitle: "Don't trust keywords alone.\nSee how the system was built.",
    proofIntro: "Each case study connects a CV claim to architecture, source code, tests and explicit limitations.",
    llmDescription: "A proof-of-concept LLM security gateway protecting a RAG pipeline against prompt injection, data leakage and document poisoning with layered guardrails.",
    benchmarkCases: "cases in a frozen v2 benchmark", guardLayers: "guard layers and provenance control", repeatable: "reproducible tests, evidence and release gates", readCase: "Read case study →",
    sreDescription: "A two-node lab deliberately broken, recovered, hardened and documented with real operational evidence.",
    sreNode1: "2× Ubuntu node", sreNode2: "Syslog / Prometheus", sreNode3: "RCA + saved output",
    suriDescription: "88 hand-written rules, the same attack set replayed twice: default rules only, then +88 custom rules. Alerts rose 54 → 486, but only 16/88 rules actually fired.",
    tonDescription: "An unsupervised autoencoder flagging anomalies across 4 telemetry layers without attack labels. High detection comes with double-digit false positives on 3 of 4 layers.",
    gnnDescription: "A research prototype turning network flows into a dynamic graph for GraphSAGE/GATv2 and multi-threaded streaming inference.",
    gnnNode1: "PCAP / flows", gnnNode2: "Dynamic graph", gnnNode3: "GraphSAGE / GATv2",
    inspectEvidence: "Inspect evidence", educationLabel: "EDUCATION / CONTEXT", degree: "B.Eng. Information Security · Final-year student",
    nextConversation: "THE NEXT CONVERSATION", contactTitle: "Have a security problem that needs\nsomeone to follow the evidence?", footerNote: "Built as a CV. Designed as evidence."
  }
};

const root = document.documentElement;
const langButton = document.querySelector('#languageToggle');
const themeButton = document.querySelector('#themeToggle');

function setLanguage(lang) {
  root.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    if (!node.dataset.vi) node.dataset.vi = node.textContent;
    const value = lang === 'vi' ? node.dataset.vi : translations.en[node.dataset.i18n];
    if (value) node.textContent = value;
  });
  langButton.textContent = lang === 'vi' ? 'EN' : 'VI';
  localStorage.setItem('portfolio-language', lang);
}

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('portfolio-theme', theme);
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
}

langButton.addEventListener('click', () => setLanguage(root.lang === 'vi' ? 'en' : 'vi'));
themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
document.querySelector('#printCv').addEventListener('click', () => window.print());
document.querySelector('#currentYear').textContent = new Date().getFullYear();

// Noise Board: click/focus a TON_IoT layer to read its full detail in the readout line.
(function initNoiseBoard() {
  const chart = document.querySelector('#tonChart');
  if (!chart) return;
  const readout = chart.querySelector('.noise-readout');
  const defaultText = readout ? readout.textContent : '';
  chart.querySelectorAll('.layer').forEach((layer) => {
    const show = () => { if (readout) readout.textContent = layer.dataset.detail; };
    const reset = () => { if (readout) readout.textContent = readout.dataset.vi ? (root.lang === 'vi' ? readout.dataset.vi : translations.en.noiseDefault) : defaultText; };
    layer.addEventListener('click', show);
    layer.addEventListener('focus', show);
    layer.addEventListener('mouseleave', reset);
    layer.addEventListener('blur', reset);
  });
})();

setLanguage(localStorage.getItem('portfolio-language') || 'vi');
setTheme(localStorage.getItem('portfolio-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

if (new URLSearchParams(location.search).has('print')) {
  setLanguage('en');
  setTheme('light');
  document.body.classList.add('print-mode');
}
