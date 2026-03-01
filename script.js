const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

const heroGradient = document.querySelector(".hero-gradient");
window.addEventListener("scroll", () => {
  const offset = window.scrollY * 0.12;
  heroGradient.style.transform = `translateY(${offset}px)`;
});

const modal = document.getElementById("projectModal");
const closeModal = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.project;
    modalCategory.textContent = card.dataset.category;
    modalDescription.textContent = card.dataset.description;
    modal.showModal();
  });
});

closeModal.addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    modal.close();
  }
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  cursorDot.style.transform = `translate(${clientX}px, ${clientY}px)`;
  ringX += (clientX - ringX) * 0.2;
  ringY += (clientY - ringY) * 0.2;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
});

document.querySelectorAll("a, button, .project-card").forEach((target) => {
  target.addEventListener("mouseenter", () => {
    cursorRing.style.transform += " scale(1.3)";
  });
  target.addEventListener("mouseleave", () => {
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
