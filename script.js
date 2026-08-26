(() => {
  const GH_ENDPOINT = "https://api.github.com/users/BernardoApl/repos?sort=updated&per_page=100";
  const MAX_REPOS = 20;
  const THEME_KEY = "bernardoPortfolioTheme";
  const LANGUAGE_KEY = "bernardoPortfolioLanguage";

  const qs = (selector) => document.querySelector(selector);
  const qsa = (selector) => Array.from(document.querySelectorAll(selector));

  let repos = [];

  function applyTheme(theme) {
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
      toggle.setAttribute(
        "aria-label",
        nextTheme === "dark" ? "Alternar para modo claro" : "Alternar para modo escuro"
      );
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));

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
      const opened = nav.classList.toggle("active");
      toggle.setAttribute("aria-expanded", String(opened));
    });

    qsa("#nav-items a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("active")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
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

  function initLanguageSwitcher() {
    const buttons = qsa(".language-option");
    if (!buttons.length) return;

    const translations = {
      "pt-BR": {
        title: "Bernardo Augusto | Portfolio",
        nav: ["Home", "Sobre", "Servicos", "Projetos", "Experiencias", "Curriculo", "Contato"],
        hello: "Ola, eu sou",
        role: "Estudante de Engenharia de Software",
        summary: "Atuo como Engenheiro de Dados na Ambientar, desenvolvendo projetos reais de software, solucoes de dados e automacoes com foco em clareza, organizacao e impacto no processo.",
        contactButton: "Entrar em contato <i class=\"fa-solid fa-arrow-right\" aria-hidden=\"true\"></i>",
        projectsButton: "Ver projetos <i class=\"fa-solid fa-angle-right\" aria-hidden=\"true\"></i>",
        aboutKicker: "Sobre mim",
        aboutTitle: "Perfil profissional em evolucao, com foco em tecnologia aplicada.",
        aboutText: "Sou estudante de Engenharia de Software na PUC Minas e trabalho como Engenheiro de Dados na Ambientar desde maio de 2025. Atuo em projetos reais de software, criacao de pipelines, organizacao de bases, dashboards, automacoes e analise de dados para apoiar decisoes.",
        servicesTitle: "Servicos e habilidades",
        projectsTitle: "Repositorios em movimento",
        projectsIntro: "Carrossel atualizado automaticamente com meus repositorios publicos mais recentes.",
        githubButton: "Ver todos no GitHub",
        expKicker: "Experiencias",
        expTitle: "Vivencias academicas, tecnicas e profissionais.",
        cvKicker: "Curriculo",
        cvTitle: "Curriculo em PDF para visualizar e baixar.",
        cvText: "Escolha a versao PT-BR ou EN-US e confira o curriculo diretamente na pagina.",
        download: "Baixar PDF",
        open: "Abrir em nova guia",
        contactKicker: "Contato",
        contactTitle: "Vamos conversar?",
        contactText: "Estou aberto a oportunidades de estagio, posicoes junior e projetos de desenvolvimento web, backend e automacao.",
        nameLabel: "Nome",
        emailLabel: "Email",
        messageLabel: "Mensagem",
        submit: "Enviar mensagem <i class=\"fa-regular fa-paper-plane\"></i>",
        footer: "© 2026 Bernardo Augusto. Todos os direitos reservados.",
        top: "Voltar ao topo",
        cvFile: "CV_main_PT-BR.pdf"
      },
      "en-US": {
        title: "Bernardo Augusto | Portfolio",
        nav: ["Home", "About", "Services", "Projects", "Experience", "Resume", "Contact"],
        hello: "Hi, I am",
        role: "Software Engineering Student",
        summary: "I work as a Data Engineer at Ambientar, building real software projects, data solutions and automations focused on clarity, organization and process impact.",
        contactButton: "Contact me <i class=\"fa-solid fa-arrow-right\" aria-hidden=\"true\"></i>",
        projectsButton: "View projects <i class=\"fa-solid fa-angle-right\" aria-hidden=\"true\"></i>",
        aboutKicker: "About me",
        aboutTitle: "A growing professional profile focused on applied technology.",
        aboutText: "I am a Software Engineering student at PUC Minas and I have been working as a Data Engineer at Ambientar since May 2025. I work on real software projects, data pipelines, database organization, dashboards, automations and data analysis to support decisions.",
        servicesTitle: "Services and skills",
        projectsTitle: "Repositories in motion",
        projectsIntro: "Automatically updated carousel with my latest public GitHub repositories.",
        githubButton: "See all on GitHub",
        expKicker: "Experience",
        expTitle: "Academic, technical and professional experience.",
        cvKicker: "Resume",
        cvTitle: "PDF resume ready to view and download.",
        cvText: "Choose the PT-BR or EN-US version and view the resume directly on the page.",
        download: "Download PDF",
        open: "Open in new tab",
        contactKicker: "Contact",
        contactTitle: "Let's talk?",
        contactText: "I am open to internship, junior roles and web, backend and automation projects.",
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        submit: "Send message <i class=\"fa-regular fa-paper-plane\"></i>",
        footer: "© 2026 Bernardo Augusto. All rights reserved.",
        top: "Back to top",
        cvFile: "CV_main_EN-US.pdf"
      }
    };

    const setText = (selector, value) => {
      const element = qs(selector);
      if (element) element.textContent = value;
    };
    const setHtml = (selector, value) => {
      const element = qs(selector);
      if (element) element.innerHTML = value;
    };

    function applyLanguage(language) {
      const lang = translations[language] ? language : "pt-BR";
      const t = translations[lang];
      document.documentElement.lang = lang;
      document.title = t.title;
      buttons.forEach((button) => {
        const active = button.dataset.language === lang;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      localStorage.setItem(LANGUAGE_KEY, lang);

      qsa(".nav-items a").forEach((link, index) => {
        if (t.nav[index]) link.textContent = t.nav[index];
      });

      setText(".hello", t.hello);
      setText(".role", t.role);
      setText(".summary", t.summary);
      setHtml(".hero-actions .btn-primary", t.contactButton);
      setHtml(".hero-actions .btn-light", t.projectsButton);
      setText("#about .section-kicker", t.aboutKicker);
      setText("#about h2", t.aboutTitle);
      setText("#about-description", t.aboutText);
      setText("#services h2", t.servicesTitle);
      setText("#projects h2", t.projectsTitle);
      setText("#projects .section-intro", t.projectsIntro);
      setText("#projects .section-heading .btn", t.githubButton);
      setText("#experience .section-kicker", t.expKicker);
      setText("#experience h2", t.expTitle);
      setText("#cv .section-kicker", t.cvKicker);
      setText("#cv h2", t.cvTitle);
      setText("#cv .cv-copy p:not(.section-kicker)", t.cvText);
      setText("#download-cv-pdf", t.download);
      setText("#open-cv-pdf", t.open);
      setText("#contact .section-kicker", t.contactKicker);
      setText("#contact h2", t.contactTitle);
      setText("#contact .contact-layout > div > p:not(.section-kicker)", t.contactText);
      setText('label[for="name"]', t.nameLabel);
      setText('label[for="email"]', t.emailLabel);
      setText('label[for="message"]', t.messageLabel);
      setHtml('#contact-form button[type="submit"]', t.submit);
      setText(".footer-inner span", t.footer);
      setText(".footer-inner a", t.top);

      const cvButton = qsa(".cv-lang-btn").find((button) => button.dataset.cvFile === t.cvFile);
      if (cvButton) cvButton.click();
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => applyLanguage(button.dataset.language));
    });
    applyLanguage(localStorage.getItem(LANGUAGE_KEY) || "pt-BR");
  }

  function initCvSwitcher() {
    const buttons = qsa(".cv-lang-btn");
    const frame = qs("#cv-pdf-frame");
    const fileName = qs("#cv-file-name");
    const status = qs("#pdf-status");
    const download = qs("#download-cv-pdf");
    const open = qs("#open-cv-pdf");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const file = button.dataset.cvFile;
        if (!file) return;

        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        if (frame) frame.src = file;
        if (fileName) fileName.textContent = file;
        if (status) status.textContent = "Pronto";
        if (download) {
          download.href = file;
          download.setAttribute("download", file);
        }
        if (open) open.href = file;
      });
    });
  }

  function repoDescription(repo) {
    if (repo.description) return repo.description;
    const fallback = {
      CarExpress: "Sistema de gerenciamento de veiculos com cadastro, consulta, atualizacao e remocao.",
      CV: "Curriculo profissional em LaTeX, com versoes em portugues e ingles.",
      BernardoApl: "README de perfil profissional no GitHub."
    };
    return fallback[repo.name] || "Repositorio publico para estudos, praticas e evolucao tecnica.";
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
    const updated = new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(new Date(repo.pushed_at || repo.updated_at));
    const name = escapeHtml(repo.name);
    const description = escapeHtml(repoDescription(repo));
    const language = escapeHtml(repo.language || "GitHub");
    const url = escapeHtml(repo.html_url);
    const icon = repoIcon(repo);

    return `
      <a class="repo-card repo-carousel-card" href="${url}" target="_blank" rel="noopener" ${duplicate ? 'aria-hidden="true" tabindex="-1"' : ''}>
        <span class="repo-icon"><i class="${icon}" aria-hidden="true"></i></span>
        <span class="repo-content">
          <strong>${name}</strong>
          <small>${description}</small>
          <span class="repo-meta">
            <span>${language}</span>
            <span>Atualizado: ${updated}</span>
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
      container.innerHTML = '<p class="empty-state" id="projects-placeholder">Nao foi possivel carregar os repositorios agora.</p>';
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
      renderRepos();
    } catch (error) {
      console.warn("Erro ao carregar repositorios:", error);
      repos = [];
      renderRepos();
    }
  }

  function initContactForm() {
    const form = qs("#contact-form");
    const feedback = qs("#contact-feedback");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = qs("#name")?.value.trim();
      const email = qs("#email")?.value.trim();
      const message = qs("#message")?.value.trim();

      if (!name || !email || !message) {
        if (feedback) feedback.textContent = "Preencha todos os campos antes de enviar.";
        return;
      }

      const subject = encodeURIComponent("Contato pelo portfolio");
      const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:b.lopes.software@gmail.com?subject=${subject}&body=${body}`;

      if (feedback) feedback.textContent = "Abrindo seu aplicativo de email...";
      form.reset();
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



