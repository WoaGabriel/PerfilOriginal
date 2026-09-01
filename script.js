(() => {
  const GH_ENDPOINT =
    "https://api.github.com/users/WoaGabriel/repos?sort=updated&per_page=100";
  const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/gabriel555467@gmail.com";
  const MAX_REPOS = 20;
  const THEME_KEY = "joaoPortfolioTheme";
  const LANGUAGE_KEY = "joaoPortfolioLanguage";

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
        nextTheme === "dark"
          ? "Alternar para modo claro"
          : "Alternar para modo escuro",
      );
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)",
    )?.matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));

    const toggle = qs(".theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      const isDark = document.body.classList.contains("theme-dark");
      applyTheme(isDark ? "light" : "dark");
    });
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

    const activateLink = (sectionId) => {
      links.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${sectionId}`,
        );
      });
    };

    const update = () => {
      const pageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;

      // Garante que a última seção seja marcada ao chegar ao fim da página.
      if (pageBottom && sections.length) {
        activateLink(sections[sections.length - 1].id);
        return;
      }

      const position = window.scrollY + 110;
      let currentSection = sections[0]?.id;

      sections.forEach((section) => {
        if (position >= section.offsetTop) {
          currentSection = section.id;
        }
      });

      if (currentSection) {
        activateLink(currentSection);
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initLanguageSwitcher() {
    const buttons = qsa(".language-option");
    if (!buttons.length) return;

    const translations = {
      "pt-BR": {
        title: "João Gabriel | Portfolio",
        nav: [
          "Home",
          "Sobre",
          "Servicos",
          "Projetos",
          "Experiencias",
          "Curriculo",
          "Contato",
        ],
        hello: "Ola, eu sou",
        role: "Estudante de Engenharia de Software",
        summary:
          "Busco minha primeira oportunidade de estagio em tecnologia, com interesse em Machine Learning, Engenharia de Dados e Computacao em Nuvem.",
        contactButton:
          'Entrar em contato <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        projectsButton:
          'Ver projetos <i class="fa-solid fa-angle-right" aria-hidden="true"></i>',
        aboutKicker: "Sobre mim",
        aboutTitle:
          "Formacao em software com interesse em dados, inteligencia artificial e nuvem.",
        aboutText:
          "Sou estudante do 4o periodo de Engenharia de Software na PUC Minas. Desenvolvo projetos academicos completos, do banco de dados a interface, e busco aprofundar meus conhecimentos em Machine Learning, Engenharia de Dados e Computacao em Nuvem.",
        servicesTitle: "Servicos e habilidades",
        projectsTitle: "Repositorios em movimento",
        projectsIntro:
          "Carrossel atualizado automaticamente com meus repositorios publicos mais recentes.",
        githubButton: "Ver todos no GitHub",
        expKicker: "Projetos",
        expTitle: "Experiencias academicas e tecnicas.",
        cvKicker: "Curriculo",
        cvTitle: "Curriculo em PDF para visualizar e baixar.",
        cvText:
          "Escolha a versao PT-BR ou EN-US e confira o curriculo diretamente na pagina.",
        download: "Baixar PDF",
        open: "Abrir em nova guia",
        contactKicker: "Contato",
        contactTitle: "Vamos conversar?",
        contactText:
          "Estou aberto a oportunidades de estagio em desenvolvimento, Machine Learning, Engenharia de Dados e Computacao em Nuvem.",
        nameLabel: "Nome",
        emailLabel: "Email",
        messageLabel: "Mensagem",
        submit: 'Enviar mensagem <i class="fa-regular fa-paper-plane"></i>',
        footer: "© 2026 João Gabriel. Todos os direitos reservados.",
        top: "Voltar ao topo",
        cvFile: "CV_main_PT-BR.pdf",
      },
      "en-US": {
        title: "João Gabriel | Portfolio",
        nav: [
          "Home",
          "About",
          "Services",
          "Projects",
          "Experience",
          "Resume",
          "Contact",
        ],
        hello: "Hi, I am",
        role: "Software Engineering Student",
        summary:
          "I am seeking my first technology internship, with interests in Machine Learning, Data Engineering and Cloud Computing.",
        contactButton:
          'Contact me <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        projectsButton:
          'View projects <i class="fa-solid fa-angle-right" aria-hidden="true"></i>',
        aboutKicker: "About me",
        aboutTitle:
          "Software education with an interest in data, artificial intelligence and cloud.",
        aboutText:
          "I am a fourth-semester Software Engineering student at PUC Minas. I develop end-to-end academic projects and am expanding my knowledge of Machine Learning, Data Engineering and Cloud Computing.",
        servicesTitle: "Services and skills",
        projectsTitle: "Repositories in motion",
        projectsIntro:
          "Automatically updated carousel with my latest public GitHub repositories.",
        githubButton: "See all on GitHub",
        expKicker: "Projects",
        expTitle: "Academic and technical experience.",
        cvKicker: "Resume",
        cvTitle: "PDF resume ready to view and download.",
        cvText:
          "Choose the PT-BR or EN-US version and view the resume directly on the page.",
        download: "Download PDF",
        open: "Open in new tab",
        contactKicker: "Contact",
        contactTitle: "Let's talk?",
        contactText:
          "I am open to internship opportunities in development, Machine Learning, Data Engineering and Cloud Computing.",
        nameLabel: "Name",
        emailLabel: "Email",
        messageLabel: "Message",
        submit: 'Send message <i class="fa-regular fa-paper-plane"></i>',
        footer: "© 2026 João Gabriel. All rights reserved.",
        top: "Back to top",
        cvFile: "CV_main_EN-US.pdf",
      },
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
      setText(
        "#contact .contact-layout > div > p:not(.section-kicker)",
        t.contactText,
      );
      setText('label[for="name"]', t.nameLabel);
      setText('label[for="email"]', t.emailLabel);
      setText('label[for="message"]', t.messageLabel);
      setHtml('#contact-form button[type="submit"]', t.submit);
      setText(".footer-inner span", t.footer);
      setText(".footer-inner a", t.top);

      const cvButton = qsa(".cv-lang-btn").find(
        (button) => button.dataset.cvFile === t.cvFile,
      );
      if (cvButton) cvButton.click();
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () =>
        applyLanguage(button.dataset.language),
      );
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
      CarExpress:
        "Sistema de gerenciamento de veiculos com cadastro, consulta, atualizacao e remocao.",
      CV: "Curriculo profissional em LaTeX, com versoes em portugues e ingles.",
      WoaGabriel: "README de perfil profissional no GitHub.",
    };
    return (
      fallback[repo.name] ||
      "Repositorio publico para estudos, praticas e evolucao tecnica."
    );
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
    if (name.includes("cv") || name.includes("curriculo"))
      return "fa-solid fa-file-lines";
    if (name.includes("test") || name.includes("teste"))
      return "fa-solid fa-vial";
    return "fa-brands fa-github";
  }

  function createRepoCard(repo, duplicate = false) {
    const updated = new Intl.DateTimeFormat("pt-BR", {
      month: "short",
      year: "numeric",
    }).format(new Date(repo.pushed_at || repo.updated_at));
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
      container.innerHTML =
        '<p class="empty-state" id="projects-placeholder">Nao foi possivel carregar os repositorios agora.</p>';
      container.classList.remove("is-ready");
      return;
    }

    const cards = repos.map((repo) => createRepoCard(repo)).join("");
    const duplicateCards = repos
      .map((repo) => createRepoCard(repo, true))
      .join("");
    container.innerHTML = cards + duplicateCards;
    container.style.setProperty("--repo-count", String(repos.length));
    container.style.setProperty(
      "--repo-duration",
      `${Math.max(22, repos.length * 3.8)}s`,
    );
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
            .sort(
              (a, b) =>
                new Date(b.pushed_at || b.updated_at) -
                new Date(a.pushed_at || a.updated_at),
            )
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
    const submitButton = form?.querySelector('button[type="submit"]');
    if (!form) return;

    const feedbackMessages = {
      "pt-BR": {
        required: "Preencha todos os campos antes de enviar.",
        sending: "Enviando mensagem...",
        success: "Mensagem enviada com sucesso. Obrigado pelo contato!",
        error:
          "Nao foi possivel enviar agora. Tente novamente em alguns instantes.",
      },
      "en-US": {
        required: "Fill in every field before sending.",
        sending: "Sending message...",
        success: "Message sent successfully. Thanks for reaching out!",
        error:
          "The message could not be sent right now. Try again in a moment.",
      },
    };

    const getMessages = () =>
      feedbackMessages[document.documentElement.lang] ||
      feedbackMessages["pt-BR"];
    const setFeedback = (message, state = "") => {
      if (!feedback) return;
      feedback.textContent = message;
      feedback.dataset.state = state;
    };
    const setSubmitting = (isSubmitting) => {
      if (!submitButton) return;
      submitButton.disabled = isSubmitting;
      submitButton.setAttribute("aria-busy", String(isSubmitting));
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const messages = getMessages();
      const name = form.elements.namedItem("name")?.value.trim();
      const email = form.elements.namedItem("email")?.value.trim();
      const message = form.elements.namedItem("message")?.value.trim();

      if (!name || !email || !message) {
        setFeedback(messages.required, "error");
        return;
      }

      setSubmitting(true);
      setFeedback(messages.sending);

      try {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _replyto: email,
            _subject: "Contato pelo portfolio",
            _template: "table",
            _captcha: "false",
          }),
        });

        if (!response.ok) throw new Error("Contact request failed");

        setFeedback(messages.success, "success");
        form.reset();
      } catch (error) {
        console.warn("Erro ao enviar contato:", error);
        setFeedback(messages.error, "error");
      } finally {
        setSubmitting(false);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMenu();
    initActiveNav();
    initCvSwitcher();
    initLanguageSwitcher();
    initContactForm();
    loadRepos();
  });
})();
