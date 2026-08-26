(() => {
  const GH_ENDPOINT = "https://api.github.com/users/BernardoApl/repos?sort=updated&per_page=100";
  const MAX_REPOS = 20;
  const THEME_KEY = "bernardoPortfolioTheme";
  const LANGUAGE_KEY = "bernardoPortfolioLanguage";
  const CONTACT_EMAIL = "b.lopes.software@gmail.com";
  const CONTACT_FORM_ENDPOINT = "";

  const qs = (selector) => document.querySelector(selector);
  const qsa = (selector) => Array.from(document.querySelectorAll(selector));

  let repos = [];
  let reposLoaded = false;
  let currentLanguage = "en-US";

  const translations = {
    "pt-BR": {
      htmlLang: "pt-BR",
      title: "Bernardo Augusto | Portfolio",
      description: "Portfolio de Bernardo Augusto, estudante de Engenharia de Software com foco em backend, web e automacao.",
      ogDescription: "Projetos, curriculo e contato de Bernardo Augusto.",
      ogLocale: "pt_BR",
      navLabel: "Navegacao principal",
      brandLabel: "Inicio",
      menuOpen: "Abrir menu",
      menuClose: "Fechar menu",
      languageLabel: "Selecionar idioma",
      themeLight: "Alternar para modo claro",
      themeDark: "Alternar para modo escuro",
      downloadResume: "Baixar curriculo",
      skip: "Pular para o conteudo",
      nav: ["Home", "Sobre", "Servicos", "Projetos", "Experiencia", "Formacao", "Curriculo", "Contato"],
      photoAlt: "Foto de Bernardo Augusto",
      socialLabel: "Links sociais",
      hello: "Ola, eu sou",
      role: "Estudante de Engenharia de Software",
      summary: "Atuo como Engenheiro de Dados na Ambientar, desenvolvendo projetos de software, solucoes de dados e automacoes.",
      contactButton: "Entrar em contato <i class=\"fa-solid fa-arrow-right\" aria-hidden=\"true\"></i>",
      projectsButton: "Ver projetos <i class=\"fa-solid fa-angle-right\" aria-hidden=\"true\"></i>",
      aboutBadge: "PT-BR",
      aboutKicker: "Sobre mim",
      aboutTitle: "Perfil profissional em evolucao, com foco em tecnologia aplicada.",
      aboutText: "Sou estudante de Engenharia de Software na PUC Minas e trabalho como Engenheiro de Dados na Ambientar desde maio de 2025. Atuo em projetos reais de software, criacao de pipelines, organizacao de bases, dashboards, automacoes e analise de dados para apoiar decisoes.",
      servicesKicker: "Atuacao",
      servicesTitle: "Servicos e habilidades",
      services: [
        {
          title: "Backend",
          text: "APIs, regras de negocio, integracao com banco de dados e sistemas usando Java e Spring Boot."
        },
        {
          title: "Web",
          text: "Interfaces responsivas com HTML, CSS, JavaScript, TypeScript e React."
        },
        {
          title: "Automacao",
          text: "Fluxos com n8n, Excel, Power BI e organizacao de dados para reduzir tarefas manuais."
        }
      ],
      projectsKicker: "GitHub",
      projectsTitle: "Repositorios em movimento",
      projectsIntro: "Carrossel atualizado automaticamente com meus repositorios publicos mais recentes.",
      githubButton: "Ver todos no GitHub",
      carouselLabel: "Carrossel infinito de repositorios do GitHub",
      loadingRepos: "Carregando repositorios do GitHub...",
      repoLoadError: "Nao foi possivel carregar os repositorios agora.",
      repoUpdated: "Atualizado",
      repoDateLocale: "pt-BR",
      repoFallbacks: {
        CarExpress: "Sistema de gerenciamento de veiculos com cadastro, consulta, atualizacao e remocao.",
        CV: "Curriculo profissional em LaTeX.",
        BernardoApl: "README de perfil profissional no GitHub."
      },
      repoGeneric: "Repositorio publico para estudos e pratica tecnica.",
      expKicker: "Experiencia profissional",
      expTitle: "Trabalho explicado por entregas, nao apenas por cargo.",
      educationKicker: "Formacao",
      educationTitle: "Base em Engenharia de Software em construcao.",
      timeline: [
        {
          date: "Maio 2025 - Atual",
          title: "Ambientar",
          text: "<strong>Engenheiro de Dados</strong> - Transformo rotinas manuais em fluxos de dados mais organizados, desenvolvendo pipelines, integracoes, bases estruturadas, dashboards, indicadores e automacoes que apoiam decisoes internas."
        },
        {
          date: "2026 - Atual",
          title: "PUC Minas",
          text: "<strong>Engenharia de Software</strong> - Projetos academicos, praticas de laboratorio, modelagem, front-end, backend e testes."
        }
      ],
      cvKicker: "Curriculo",
      cvTitle: "Curriculo em PDF para visualizar e baixar.",
      cvText: "Escolha a versao PT-BR ou EN-US e confira o curriculo diretamente na pagina.",
      cvControlsLabel: "Selecionar idioma do curriculo",
      cvPreviewTitle: "Visualizacao do curriculo em PDF",
      cvReady: "Pronto",
      download: "Baixar PDF",
      open: "Abrir em nova guia",
      cvFile: "CV_main_PT-BR.pdf",
      contactKicker: "Contato",
      contactTitle: "Vamos conversar?",
      contactText: "Estou aberto a oportunidades de estagio, posicoes junior e projetos de desenvolvimento web, backend e automacao.",
      nameLabel: "Nome",
      emailLabel: "Email",
      messageLabel: "Mensagem",
      submit: "Enviar mensagem <i class=\"fa-regular fa-paper-plane\" aria-hidden=\"true\"></i>",
      requiredFeedback: "Preencha todos os campos antes de enviar.",
      invalidEmailFeedback: "Digite um email valido.",
      emailSubject: "Contato pelo portfolio",
      emailName: "Nome",
      emailFrom: "Email",
      sendingFeedback: "Enviando mensagem...",
      sentFeedback: "Mensagem enviada com sucesso.",
      sendErrorFeedback: "Nao foi possivel enviar agora. Tente novamente em alguns minutos.",
      formNotConfigured: "Formulario ainda sem endpoint de envio configurado.",
      footer: "© 2026 Bernardo Augusto. Todos os direitos reservados.",
      top: "Voltar ao topo"
    },
    "en-US": {
      htmlLang: "en-US",
      title: "Bernardo Augusto | Portfolio",
      description: "Portfolio of Bernardo Augusto, a Software Engineering student focused on backend, web development, and automation.",
      ogDescription: "Projects, resume, and contact information from Bernardo Augusto.",
      ogLocale: "en_US",
      navLabel: "Main navigation",
      brandLabel: "Home",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      languageLabel: "Select language",
      themeLight: "Switch to light mode",
      themeDark: "Switch to dark mode",
      downloadResume: "Download resume",
      skip: "Skip to content",
      nav: ["Home", "About", "Services", "Projects", "Experience", "Education", "Resume", "Contact"],
      photoAlt: "Photo of Bernardo Augusto",
      socialLabel: "Social links",
      hello: "Hi, I am",
      role: "Software Engineering Student",
      summary: "I work as a Data Engineer at Ambientar, building software projects, data solutions, and automation workflows.",
      contactButton: "Contact me <i class=\"fa-solid fa-arrow-right\" aria-hidden=\"true\"></i>",
      projectsButton: "View projects <i class=\"fa-solid fa-angle-right\" aria-hidden=\"true\"></i>",
      aboutBadge: "EN-US",
      aboutKicker: "About me",
      aboutTitle: "A growing professional profile focused on applied technology.",
      aboutText: "I am a Software Engineering student at PUC Minas and I have been working as a Data Engineer at Ambientar since May 2025. I work on real software projects, data pipelines, database organization, dashboards, automations and data analysis to support decisions.",
      servicesKicker: "Work areas",
      servicesTitle: "Services and skills",
      services: [
        {
          title: "Backend",
          text: "APIs, business rules, database integration, and systems using Java and Spring Boot."
        },
        {
          title: "Web",
          text: "Responsive interfaces with HTML, CSS, JavaScript, TypeScript, and React."
        },
        {
          title: "Automation",
          text: "Workflows with n8n, Excel, Power BI, and data organization to reduce manual tasks."
        }
      ],
      projectsKicker: "GitHub",
      projectsTitle: "Repositories in motion",
      projectsIntro: "Automatically updated carousel with my latest public GitHub repositories.",
      githubButton: "See all on GitHub",
      carouselLabel: "Infinite carousel of GitHub repositories",
      loadingRepos: "Loading GitHub repositories...",
      repoLoadError: "Unable to load GitHub repositories right now.",
      repoUpdated: "Updated",
      repoDateLocale: "en-US",
      repoFallbacks: {
        CarExpress: "Vehicle management system with create, read, update, and delete features.",
        CV: "Professional resume built with LaTeX.",
        BernardoApl: "Professional GitHub profile README."
      },
      repoGeneric: "Public repository for studies and technical practice.",
      expKicker: "Professional experience",
      expTitle: "Work described by delivery, not only by title.",
      educationKicker: "Education",
      educationTitle: "Software Engineering foundation in progress.",
      timeline: [
        {
          date: "May 2025 - Present",
          title: "Ambientar",
          text: "<strong>Data Engineer</strong> - I turn manual routines into organized data workflows, building pipelines, integrations, structured datasets, dashboards, indicators, and automations that support internal decisions."
        },
        {
          date: "2026 - Present",
          title: "PUC Minas",
          text: "<strong>Software Engineering</strong> - Academic projects, lab work, modeling, front-end, backend, and testing."
        }
      ],
      cvKicker: "Resume",
      cvTitle: "PDF resume ready to view and download.",
      cvText: "Choose the PT-BR or EN-US version and view the resume directly on the page.",
      cvControlsLabel: "Select resume language",
      cvPreviewTitle: "PDF resume preview",
      cvReady: "Ready",
      download: "Download PDF",
      open: "Open in new tab",
      cvFile: "CV_main_EN-US.pdf",
      contactKicker: "Contact",
      contactTitle: "Let's talk?",
      contactText: "I am open to internships, junior roles, and web, backend, and automation projects.",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      submit: "Send message <i class=\"fa-regular fa-paper-plane\" aria-hidden=\"true\"></i>",
      requiredFeedback: "Fill in all fields before sending.",
      invalidEmailFeedback: "Enter a valid email address.",
      emailSubject: "Portfolio contact",
      emailName: "Name",
      emailFrom: "Email",
      sendingFeedback: "Sending message...",
      sentFeedback: "Message sent successfully.",
      sendErrorFeedback: "Unable to send right now. Try again in a few minutes.",
      formNotConfigured: "Contact form endpoint is not configured yet.",
      footer: "© 2026 Bernardo Augusto. All rights reserved.",
      top: "Back to top"
    }
  };

  function copy() {
    return translations[currentLanguage] || translations["en-US"];
  }

  function setText(selector, value) {
    const element = qs(selector);
    if (element) element.textContent = value;
  }

  function setHtml(selector, value) {
    const element = qs(selector);
    if (element) element.innerHTML = value;
  }

  function setAttr(selector, attribute, value) {
    const element = qs(selector);
    if (element) element.setAttribute(attribute, value);
  }

  function applyTheme(theme) {
    const t = copy();
    const nextTheme = theme === "dark" ? "dark" : "light";
    document.body.classList.toggle("theme-dark", nextTheme === "dark");
    localStorage.setItem(THEME_KEY, nextTheme);

    const icon = qs(".theme-toggle i");
    const toggle = qs(".theme-toggle");
    if (icon) {
      icon.classList.toggle("fa-sun", nextTheme === "light");
      icon.classList.toggle("fa-moon", nextTheme === "dark");
    }
    if (toggle) {
      toggle.setAttribute("aria-label", nextTheme === "dark" ? t.themeLight : t.themeDark);
    }
  }

  function initTheme() {
    const urlTheme = new URLSearchParams(window.location.search).get("theme");
    const themeFromUrl = urlTheme === "dark" || urlTheme === "light" ? urlTheme : null;
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    applyTheme(themeFromUrl || saved || (prefersDark ? "dark" : "light"));

    const toggle = qs(".theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("theme-dark");
      applyTheme(isDark ? "light" : "dark");
    });
  }

  function initProfilePhoto() {
    const photo = qs(".hero-photo");
    if (!photo) return;

    const candidates = [
      "./bernardo-profile.png",
      "./bernardo-profile.jpg",
      "./perfil.png",
      "./perfil.jpg",
      "./profile.png",
      "./profile.jpg"
    ];
    let current = 0;

    function tryNextImage() {
      current += 1;
      if (current >= candidates.length) {
        photo.classList.add("is-hidden");
        return;
      }
      photo.src = candidates[current];
    }

    photo.addEventListener("load", () => {
      photo.classList.remove("is-hidden");
    });

    photo.addEventListener("error", tryNextImage);
    photo.src = candidates[0];
  }

  function initMenu() {
    const toggle = qs(".menu-toggle");
    const nav = qs("#nav-items");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const t = copy();
      const opened = nav.classList.toggle("active");
      toggle.setAttribute("aria-expanded", String(opened));
      toggle.setAttribute("aria-label", opened ? t.menuClose : t.menuOpen);
    });

    qsa("#nav-items a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", copy().menuOpen);
      });
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("active")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", copy().menuOpen);
    });
  }

  function initActiveNav() {
    const sections = qsa("main section[id]");
    const links = qsa(".nav-items a");

    const update = () => {
      const y = window.scrollY + 110;
      sections.forEach((section) => {
        const href = `#${section.id}`;
        const link = links.find((item) => item.getAttribute("href") === href);
        if (!link) return;
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (y >= top && y < bottom) {
          links.forEach((item) => item.classList.remove("active"));
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  function updateTimeline(t) {
    qsa(".timeline-item").forEach((item, index) => {
      const content = t.timeline[index];
      if (!content) return;
      const date = item.querySelector("span");
      const title = item.querySelector("h3");
      const text = item.querySelector("p");
      if (date) date.textContent = content.date;
      if (title) title.textContent = content.title;
      if (text) text.innerHTML = content.text;
    });
  }

  function updateServices(t) {
    qsa(".service-card").forEach((card, index) => {
      const content = t.services[index];
      if (!content) return;
      const title = card.querySelector("h3");
      const text = card.querySelector("p");
      if (title) title.textContent = content.title;
      if (text) text.textContent = content.text;
    });
  }

  function updateMeta(t) {
    document.documentElement.lang = t.htmlLang;
    document.title = t.title;
    setAttr('meta[name="description"]', "content", t.description);
    setAttr('meta[property="og:description"]', "content", t.ogDescription);
    setAttr('meta[property="og:locale"]', "content", t.ogLocale);
  }

  function renderAboutCard(t) {
    const aboutText = qs(".about-text");
    if (!aboutText) return;

    let card = qs("#about-language-card");
    if (!card) {
      card = document.createElement("article");
      card.className = "language-card";
      card.id = "about-language-card";
      aboutText.appendChild(card);
    }

    aboutText.replaceChildren(card);
    card.replaceChildren();

    const badge = document.createElement("span");
    const text = document.createElement("p");
    badge.id = "about-language-badge";
    text.id = "about-language-text";
    badge.textContent = t.aboutBadge;
    text.textContent = t.aboutText;
    card.append(badge, text);
  }

  function setCvFile(file, t = copy()) {
    const frame = qs("#cv-pdf-frame");
    const fileName = qs("#cv-file-name");
    const status = qs("#pdf-status");
    const download = qs("#download-cv-pdf");
    const open = qs("#open-cv-pdf");

    qsa(".cv-lang-btn").forEach((button) => {
      button.classList.toggle("active", button.dataset.cvFile === file);
    });

    if (frame) frame.src = file;
    if (fileName) fileName.textContent = file;
    if (status) status.textContent = t.cvReady;
    if (download) {
      download.href = file;
      download.setAttribute("download", file);
    }
    if (open) open.href = file;
    setAttr(".nav-download", "href", file);
    setAttr(".nav-download", "download", file);
    setAttr("#cv-pdf-frame", "title", t.cvPreviewTitle);
  }

  function applyLanguage(language) {
    currentLanguage = translations[language] ? language : "en-US";
    const t = copy();

    updateMeta(t);
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);

    qsa(".language-option").forEach((button) => {
      const active = button.dataset.language === currentLanguage;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    qsa(".nav-items a").forEach((link, index) => {
      if (t.nav[index]) link.textContent = t.nav[index];
    });

    setText(".skip-link", t.skip);
    setAttr(".navbar", "aria-label", t.navLabel);
    setAttr(".brand", "aria-label", t.brandLabel);
    setAttr(".menu-toggle", "aria-label", t.menuOpen);
    setAttr(".language-toggle", "aria-label", t.languageLabel);
    setAttr(".nav-download", "aria-label", t.downloadResume);
    setAttr(".hero-photo", "alt", t.photoAlt);
    setAttr(".social-rail", "aria-label", t.socialLabel);

    setText(".hello", t.hello);
    setText(".role", t.role);
    setText(".summary", t.summary);
    setHtml(".hero-actions .btn-primary", t.contactButton);
    setHtml(".hero-actions .btn-light", t.projectsButton);

    setText("#about .section-kicker", t.aboutKicker);
    setText("#about h2", t.aboutTitle);
    renderAboutCard(t);

    setText("#services .section-kicker", t.servicesKicker);
    setText("#services h2", t.servicesTitle);
    updateServices(t);

    setText("#projects .section-kicker", t.projectsKicker);
    setText("#projects h2", t.projectsTitle);
    setText("#projects .section-intro", t.projectsIntro);
    setText("#projects .section-heading .btn", t.githubButton);
    setAttr(".repo-carousel-viewport", "aria-label", t.carouselLabel);
    setText("#projects-placeholder", t.loadingRepos);

    setText("#experience .section-kicker", t.expKicker);
    setText("#experience h2", t.expTitle);
    setText("#education .section-kicker", t.educationKicker);
    setText("#education h2", t.educationTitle);
    updateTimeline(t);

    setText("#cv .section-kicker", t.cvKicker);
    setText("#cv h2", t.cvTitle);
    setText("#cv .cv-copy p:not(.section-kicker)", t.cvText);
    setAttr(".cv-controls", "aria-label", t.cvControlsLabel);
    setText("#download-cv-pdf", t.download);
    setText("#open-cv-pdf", t.open);
    setCvFile(t.cvFile, t);

    setText("#contact .section-kicker", t.contactKicker);
    setText("#contact h2", t.contactTitle);
    setText("#contact .contact-layout > div > p:not(.section-kicker)", t.contactText);
    setText('label[for="name"]', t.nameLabel);
    setText('label[for="email"]', t.emailLabel);
    setText('label[for="message"]', t.messageLabel);
    setHtml('#contact-form button[type="submit"]', t.submit);
    setText("#contact-feedback", "");

    setText(".footer-inner span", t.footer);
    setText(".footer-inner a", t.top);

    applyTheme(localStorage.getItem(THEME_KEY) || (document.body.classList.contains("theme-dark") ? "dark" : "light"));
    renderRepos();
  }

  function initLanguageSwitcher() {
    const buttons = qsa(".language-option");
    if (!buttons.length) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => applyLanguage(button.dataset.language));
    });

    const urlLanguage = new URLSearchParams(window.location.search).get("lang");
    applyLanguage(urlLanguage || localStorage.getItem(LANGUAGE_KEY) || "en-US");
  }

  function initCvSwitcher() {
    qsa(".cv-lang-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const file = button.dataset.cvFile;
        if (file) setCvFile(file);
      });
    });
  }

  function repoDescription(repo) {
    const t = copy();
    return t.repoFallbacks[repo.name] || t.repoGeneric;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function repoIcon(repo) {
    const language = (repo.language || "").toLowerCase();
    const name = (repo.name || "").toLowerCase();

    if (language.includes("java")) return "fa-brands fa-java";
    if (language.includes("javascript")) return "fa-brands fa-js";
    if (language.includes("typescript")) return "fa-solid fa-code";
    if (language.includes("html")) return "fa-brands fa-html5";
    if (language.includes("css")) return "fa-brands fa-css3-alt";
    if (name.includes("car")) return "fa-solid fa-car-side";
    if (name.includes("cv") || name.includes("curriculo")) return "fa-solid fa-file-lines";
    if (name.includes("test") || name.includes("teste")) return "fa-solid fa-vial";
    return "fa-brands fa-github";
  }

  function createRepoCard(repo, duplicate = false) {
    const t = copy();
    const updated = new Intl.DateTimeFormat(t.repoDateLocale, { month: "short", year: "numeric" }).format(new Date(repo.pushed_at || repo.updated_at));
    const name = escapeHtml(repo.name);
    const description = escapeHtml(repoDescription(repo));
    const language = escapeHtml(repo.language || "GitHub");
    const url = escapeHtml(repo.html_url);
    const icon = repoIcon(repo);

    return `
      <a class="repo-card repo-carousel-card" href="${url}" target="_blank" rel="noopener" ${duplicate ? 'aria-hidden="true" tabindex="-1"' : ""}>
        <span class="repo-icon"><i class="${icon}" aria-hidden="true"></i></span>
        <span class="repo-content">
          <strong>${name}</strong>
          <small>${description}</small>
          <span class="repo-meta">
            <span>${language}</span>
            <span>${t.repoUpdated}: ${updated}</span>
          </span>
        </span>
      </a>
    `;
  }

  function renderRepos() {
    const container = qs("#projects-container");
    if (!container) return;

    container.innerHTML = "";

    if (!repos.length) {
      container.innerHTML = `<p class="empty-state" id="projects-placeholder">${reposLoaded ? copy().repoLoadError : copy().loadingRepos}</p>`;
      container.classList.remove("is-ready");
      return;
    }

    const cards = repos.map((repo) => createRepoCard(repo)).join("");
    const duplicateCards = repos.map((repo) => createRepoCard(repo, true)).join("");
    container.innerHTML = cards + duplicateCards;
    container.style.setProperty("--repo-count", String(repos.length));
    container.style.setProperty("--repo-duration", `${Math.max(22, repos.length * 3.8)}s`);
    container.classList.add("is-ready");
  }

  async function loadRepos() {
    try {
      const response = await fetch(GH_ENDPOINT);
      if (!response.ok) throw new Error("GitHub request failed");
      const data = await response.json();
      repos = Array.isArray(data)
        ? data
            .filter((repo) => !repo.fork)
            .sort((a, b) => new Date(b.pushed_at || b.updated_at) - new Date(a.pushed_at || a.updated_at))
            .slice(0, MAX_REPOS)
        : [];
      reposLoaded = true;
      renderRepos();
    } catch (error) {
      console.warn("GitHub repository loading failed:", error);
      repos = [];
      reposLoaded = true;
      renderRepos();
    }
  }

  function initContactForm() {
    const form = qs("#contact-form");
    const feedback = qs("#contact-feedback");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const t = copy();
      const name = qs("#name")?.value.trim();
      const email = qs("#email")?.value.trim();
      const message = qs("#message")?.value.trim();
      const emailInput = qs("#email");
      const submit = form.querySelector('button[type="submit"]');
      const endpoint = (CONTACT_FORM_ENDPOINT || form.dataset.formEndpoint || "").trim();

      if (!name || !email || !message) {
        if (feedback) feedback.textContent = t.requiredFeedback;
        return;
      }

      if (emailInput && !emailInput.checkValidity()) {
        if (feedback) feedback.textContent = t.invalidEmailFeedback;
        return;
      }

      if (!endpoint) {
        if (feedback) feedback.textContent = t.formNotConfigured;
        return;
      }

      const payload = new FormData(form);
      payload.set("name", name);
      payload.set("email", email);
      payload.set("message", message);
      payload.set("_subject", t.emailSubject);

      if (submit) submit.disabled = true;
      form.setAttribute("aria-busy", "true");
      if (feedback) feedback.textContent = t.sendingFeedback;

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: payload,
          headers: { Accept: "application/json" }
        });

        if (!response.ok) throw new Error("Contact form request failed");

        if (feedback) feedback.textContent = t.sentFeedback;
        form.reset();
      } catch (error) {
        console.warn("Contact form submission failed:", error);
        if (feedback) feedback.textContent = t.sendErrorFeedback;
      } finally {
        if (submit) submit.disabled = false;
        form.removeAttribute("aria-busy");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initProfilePhoto();
    initMenu();
    initActiveNav();
    initCvSwitcher();
    initLanguageSwitcher();
    initContactForm();
    loadRepos();
  });
})();
