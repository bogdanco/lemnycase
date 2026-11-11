document.addEventListener("DOMContentLoaded", () => {
  I18N.apply();

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => {
      I18N.setLang(btn.getAttribute("data-lang-btn"));
    });
  });

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closeMobile = () => {
    if (!mobileNav || !toggle) return;
    mobileNav.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    mobileNav.hidden = open;
    document.body.classList.toggle("nav-open", !open);
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobile);
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const showcase = document.querySelector("[data-project-showcase]");
  let projectIndex = 0;

  const renderProject = () => {
    if (!showcase || !PROJECTS.length) return;
    const project = PROJECTS[projectIndex];
    const main = showcase.querySelector("[data-project-main]");
    const thumb = showcase.querySelector("[data-project-thumb]");
    const name = showcase.querySelector("[data-project-name]");
    const place = showcase.querySelector("[data-project-place]");
    const count = showcase.querySelector("[data-project-count]");
    if (main) main.src = project.image;
    if (thumb) thumb.src = project.image;
    if (name) name.textContent = I18N.t(project.nameKey);
    if (place) place.textContent = I18N.t(project.placeKey);
    if (count) count.textContent = `${projectIndex + 1} / ${PROJECTS.length}`;
  };

  showcase?.querySelector("[data-project-prev]")?.addEventListener("click", () => {
    projectIndex = (projectIndex - 1 + PROJECTS.length) % PROJECTS.length;
    renderProject();
  });

  showcase?.querySelector("[data-project-next]")?.addEventListener("click", () => {
    projectIndex = (projectIndex + 1) % PROJECTS.length;
    renderProject();
  });

  document.addEventListener("lemny:langchange", renderProject);
  renderProject();

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message || !form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const subject = encodeURIComponent(`LEMNYCASE — ${name}`);
    const body = encodeURIComponent(
      `Nume: ${name}\nEmail: ${email}\nTelefon: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:contact@lemnycase.ro?subject=${subject}&body=${body}`;

    if (status) {
      status.hidden = false;
      status.textContent = I18N.t("contact.success");
    }
  });
});
