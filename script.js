const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

const heroGradient = document.querySelector(".hero-gradient");
if (heroGradient) {
  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.1;
    heroGradient.style.transform = `translateY(${offset}px)`;
  });
}

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-header nav");
if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");

if (modal && closeModal && modalTitle && modalCategory && modalDescription) {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.dataset.project || "Project";
      modalCategory.textContent = card.dataset.category || "Case Study";
      modalDescription.textContent = card.dataset.description || "Preview coming soon.";
      modal.showModal();
    });
  });

  closeModal.addEventListener("click", () => modal.close());

  modal.addEventListener("click", (event) => {
    const box = modal.getBoundingClientRect();
    if (
      event.clientX < box.left ||
      event.clientX > box.right ||
      event.clientY < box.top ||
      event.clientY > box.bottom
    ) {
      modal.close();
    }
  });
}

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
let ringX = 0;
let ringY = 0;

if (cursorDot && cursorRing) {
  window.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;
    cursorDot.style.transform = `translate(${clientX}px, ${clientY}px)`;
    ringX += (clientX - ringX) * 0.18;
    ringY += (clientY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  });

  document.querySelectorAll("a, button, .project-card").forEach((target) => {
    target.addEventListener("mouseenter", () => {
      cursorRing.style.width = "42px";
      cursorRing.style.height = "42px";
    });
    target.addEventListener("mouseleave", () => {
      cursorRing.style.width = "30px";
      cursorRing.style.height = "30px";
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
